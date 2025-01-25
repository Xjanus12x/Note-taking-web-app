import { useEffect, useState } from "react";
import { Note } from "../models/Note";
import useAddNewNote from "./useAddNewNote";
import useDeleteNote from "./useDeleteNote";

export default function useNoteArchive(
  userId: string | undefined,
  token: string,
  isArchiving: boolean
) {
  const [noteToDeleteId, setNoteToDeleteId] = useState<string>("");

  const {
    mutate: addNote,
    isSuccess: isAddSuccess,
    isError,
  } = useAddNewNote(
    userId,
    token,
    isArchiving ? "archived-notes" : "saved-notes"
  );

  const { mutate: deleteNote, isSuccess: isDeleteSuccess } = useDeleteNote(
    userId,
    token,
    isArchiving ? "saved-notes" : "archived-notes"
  );

  function archiveNote(note: Note) {
    const { unique_id, ...rest } = note;
    if (unique_id) {
      addNote(rest);
      setNoteToDeleteId(unique_id);
    }
  }

  useEffect(() => {
    if (isAddSuccess) deleteNote(noteToDeleteId);
  }, [isAddSuccess, noteToDeleteId]);

  const isSuccess = isDeleteSuccess;
  const isFailed = isError;

  return {
    archiveNote,
    deleteNote,
    isSuccess,
    isFailed,
  };
}
