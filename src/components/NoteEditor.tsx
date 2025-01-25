import { Note } from "../models/Note";
import Icon from "../ui/icons";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema, NoteSchemaFields } from "../schemas/NoteSchema";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";

type NoteEditorProps = {
  noteData: Note;
  isArchivedNote: boolean;
  onSave: (note: Note, isArchiveNote: boolean) => void;
};

const NoteEditor = forwardRef(
  ({ noteData, isArchivedNote, onSave }: NoteEditorProps, ref) => {
    const {
      register,
      watch,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm<NoteSchemaFields>({
      resolver: zodResolver(NoteSchema),
      defaultValues: useMemo(() => {
        return { ...noteData };
      }, [noteData]),
    });

    useEffect(() => {
      reset(noteData);
    }, [noteData.id]);

    const onSubmit: SubmitHandler<NoteSchemaFields> = (note) => {
      onSave(
        {
          unique_id: noteData.unique_id,
          ...note,
          lastEdited: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        },
        isArchivedNote
      );
    };

    useImperativeHandle(ref, () => ({
      triggerSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    return (
      <div className="grid content-stretch">
        <form className="grid grid-rows-[auto_1fr] gap-3">
          <NoteEditorHeader
            {...{ ...watch(), lastEdited: noteData.lastEdited }}
            register={register}
            errors={errors}
          />
          <div className="self-stretch md:py-4 md:px-6">
            {errors.content && (
              <span className="font-bold text-red-500">
                {errors.content.message}
              </span>
            )}
            <label className="sr-only" htmlFor="note-editor">
              Write your note:
            </label>
            <textarea
              className="w-full h-full px-3 py-2 bg-transparent resize-none"
              id="note-editor"
              aria-label="Note editor for writing or editing your note"
              placeholder="Start writing your note here..."
              {...register("content")}
            ></textarea>
          </div>
        </form>
      </div>
    );
  }
);

type NoteEditorHeaderProps = {
  lastEdited: string;
  errors: FieldErrors<NoteSchemaFields>;
  register: UseFormRegister<NoteSchemaFields>;
};
function NoteEditorHeader({
  lastEdited,
  errors,
  register,
}: NoteEditorHeaderProps) {
  return (
    <header className="border-b-2 md:py-5 md:px-6 border-b-border">
      <div className="grid gap-4 px-2 py-3">
        <label className="sr-only" htmlFor="note-title">
          Edit the note title
        </label>
        <input
          id="note-title"
          className="font-bold bg-transparent border-b outline-none resize-none border-border-2 md:text-2xl"
          {...register("title")}
          placeholder="Enter a title for your note..."
        />

        {errors.title && (
          <span className="font-bold text-red-500">{errors.title.message}</span>
        )}

        <label htmlFor="tags" className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2.5">
            <Icon type="tag" />
            Tags -
          </span>
          <input
            className="bg-transparent border-b outline-none border-border-2 grow"
            id="tags"
            type="text"
            {...register("tags")}
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
          />
        </label>

        {errors.tags && (
          <span className="font-bold text-red-500">{errors.tags.message}</span>
        )}

        <div className="flex gap-2">
          <span className="flex gap-1 lg:gap-2.5">
            <Icon type="clock" />
            Last edited -
          </span>
          <span className="">{lastEdited}</span>
        </div>
      </div>
    </header>
  );
}

export default NoteEditor;
