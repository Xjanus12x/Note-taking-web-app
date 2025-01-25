// NotesContext.tsx
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Note } from "../models/Note";
import { useUser } from "./AuthContext";
import useFetchNotes from "../hooks/useFetchNotes";
import useAddNewNote from "../hooks/useAddNewNote";
import useDeleteNote from "../hooks/useDeleteNote";
import useNoteArchive from "../hooks/useNoteArchive";
import useUpdateNote from "../hooks/useUpdateNote";
import { useLocation } from "react-router-dom";

type NoteContextType = {
  handleDisableButtons: () => void;
  isDisable: boolean;
  isArchivedNote: boolean;
  getNotes: (isArchived: boolean) => Note[] | undefined;
  getNoteById: (id: number, isArchived: boolean) => Note;
  getNoteTags: (isArchived: boolean) => string[];
  saveNote: (note: Note, isArchived: boolean) => void;
  deleteNote: (id: string, isArchived: boolean) => void;
  toggleArchiveStatus: (note: Note, isArchived: boolean) => void;
  isAddingNewNoteLoading: boolean;
  isAddingNewNoteSuccess: boolean;
  isAddingNewNoteError: boolean;
  isUpdatingNoteLoading: boolean;
  isUpdatingNoteSuccess: boolean;
  isUpdatingNoteError: boolean;
  isUpdatingArchivedNoteLoading: boolean;
  isUpdatingArchivedNoteSuccess: boolean;
  isUpdatingArchivedNoteError: boolean;
  isDeletingSavedNote: boolean;
  isDeletingSavedNoteSuccess: boolean;
  isFailedToDeleteSavedNote: boolean;
  isDeletingArchivedNoteLoading: boolean;
  isDeletingArchivedNoteSuccess: boolean;
  isDeletingArchivedNoteError: boolean;
  isArchivedSuccessfully: boolean;
  isFailedToArchive: boolean;
  isUnArchivingSuccessfully: boolean;
  isFailedToUnArchive: boolean;
  isLoadingSavedNotes: boolean;
  isLoadingArchivedNotes: boolean;
  searchSavedNotes: (query: string) => void;
  searchArchivedNotes: (query: string) => void;
  savedNotesSearchQuery: string;
  setSavedNotesSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  archivedNotesSearchQuery: string;
  setArchivedNotesSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const NotesContext = createContext<NoteContextType | undefined>(undefined);

type NotesProviderProps = PropsWithChildren;
export default function NotesProvider({ children }: NotesProviderProps) {
  const { user, token } = useUser();
  const {
    fetchedData: savedNotes,
    isLocalLoading: isLoadingSavedNotes,
    search: searchSavedNotes,
    noteTags: savedNoteTags,
    searchQuery: savedNotesSearchQuery,
    setSearchQuery: setSavedNotesSearchQuery,
  } = useFetchNotes(user?.uid, token, "saved-notes");

  const {
    fetchedData: archivedNotes,
    isLocalLoading: isLoadingArchivedNotes,
    search: searchArchivedNotes,
    noteTags: archivedNoteTags,
    searchQuery: archivedNotesSearchQuery,
    setSearchQuery: setArchivedNotesSearchQuery,
  } = useFetchNotes(user?.uid, token, "archived-notes");
  const { pathname } = useLocation();
  const isArchivedNote =
    pathname.includes("archives") || pathname.includes("archive");
  const {
    mutate: addNewSavedNote,
    isLoading: isAddingNewNoteLoading,
    isSuccess: isAddingNewNoteSuccess,
    isError: isAddingNewNoteError,
  } = useAddNewNote(user?.uid, token!, "saved-notes");

  const {
    mutate: updateNote,
    isLoading: isUpdatingNoteLoading,
    isSuccess: isUpdatingNoteSuccess,
    isError: isUpdatingNoteError,
  } = useUpdateNote(user?.uid, token!, "saved-notes");

  const {
    mutate: updateArchivedNote,
    isLoading: isUpdatingArchivedNoteLoading,
    isSuccess: isUpdatingArchivedNoteSuccess,
    isError: isUpdatingArchivedNoteError,
  } = useUpdateNote(user?.uid, token!, "archived-notes");

  const {
    mutate: deleteSavedNote,
    isLoading: isDeletingSavedNote,
    isSuccess: isDeletingSavedNoteSuccess,
    isError: isFailedToDeleteSavedNote,
  } = useDeleteNote(user?.uid, token!, "saved-notes");

  const {
    mutate: deleteArchivedNote,
    isLoading: isDeletingArchivedNoteLoading,
    isSuccess: isDeletingArchivedNoteSuccess,
    isError: isDeletingArchivedNoteError,
  } = useDeleteNote(user?.uid, token!, "archived-notes");

  const {
    isSuccess: isArchivedSuccessfully,
    isFailed: isFailedToArchive,
    archiveNote,
  } = useNoteArchive(user?.uid, token!, true);

  const {
    isSuccess: isUnArchivingSuccessfully,
    isFailed: isFailedToUnArchive,
    archiveNote: unArchive,
  } = useNoteArchive(user?.uid, token!, false);

  const getNotes = (isArchived: boolean) =>
    isArchived ? archivedNotes : savedNotes;

  const getNoteById = (id: number, isArchived: boolean) =>
    getNotes(isArchived)?.find((note) => note.id === id) ?? {
      id: Number(id),
      title: "",
      tags: [],
      lastEdited: "Not yet saved.",
      content: "",
      isSaved: false,
    };

  const getNoteTags = (isArchived: boolean) =>
    isArchived ? archivedNoteTags : savedNoteTags;

  const saveNoteHandler = (note: Note, isArchived: boolean) => {
    if (isArchived) updateArchivedNote(note);
    else if (note.isSaved) updateNote(note);
    else addNewSavedNote({ ...note, isSaved: true });
  };

  const deleteNoteHandler = (id: string, isArchived: boolean) => {
    if (isArchived) {
      deleteArchivedNote(id);
    } else {
      deleteSavedNote(id);
    }
  };

  const toggleArchiveStatus = (note: Note, isArchived: boolean) => {
    if (isArchived) {
      unArchive(note);
    } else {
      archiveNote(note);
    }
  };

  const [isDisable, setIsDisable] = useState(false);

  const handleDisableButtons = () => {
    setIsDisable(true);
    setTimeout(() => {
      setIsDisable(false);
    }, 10000);
  };

  const contextValue = useMemo(
    () => ({
      handleDisableButtons,
      isDisable,
      isArchivedNote,
      getNotes,
      getNoteById,
      getNoteTags,
      saveNote: saveNoteHandler,
      deleteNote: deleteNoteHandler,
      toggleArchiveStatus,
      isLoadingSavedNotes,
      isLoadingArchivedNotes,
      searchSavedNotes,
      searchArchivedNotes,
      savedNotesSearchQuery,
      setSavedNotesSearchQuery,
      archivedNotesSearchQuery,
      setArchivedNotesSearchQuery,
      isAddingNewNoteLoading,
      isAddingNewNoteSuccess,
      isAddingNewNoteError,
      isUpdatingNoteLoading,
      isUpdatingNoteSuccess,
      isUpdatingNoteError,
      isUpdatingArchivedNoteLoading,
      isUpdatingArchivedNoteSuccess,
      isUpdatingArchivedNoteError,
      isDeletingSavedNote,
      isDeletingSavedNoteSuccess,
      isFailedToDeleteSavedNote,
      isDeletingArchivedNoteLoading,
      isDeletingArchivedNoteSuccess,
      isDeletingArchivedNoteError,
      isArchivedSuccessfully,
      isFailedToArchive,
      isUnArchivingSuccessfully,
      isFailedToUnArchive,
    }),
    [
      handleDisableButtons,
      isDisable,
      isArchivedNote,
      savedNotes,
      archivedNotes,
      savedNoteTags,
      archivedNoteTags,
      isLoadingSavedNotes,
      isLoadingArchivedNotes,
      searchSavedNotes,
      searchArchivedNotes,
      savedNotesSearchQuery,
      setSavedNotesSearchQuery,
      archivedNotesSearchQuery,
      setArchivedNotesSearchQuery,
      isAddingNewNoteLoading,
      isAddingNewNoteSuccess,
      isAddingNewNoteError,
      isUpdatingNoteLoading,
      isUpdatingNoteSuccess,
      isUpdatingNoteError,
      isUpdatingArchivedNoteLoading,
      isUpdatingArchivedNoteSuccess,
      isUpdatingArchivedNoteError,
      isDeletingSavedNote,
      isDeletingSavedNoteSuccess,
      isFailedToDeleteSavedNote,
      isDeletingArchivedNoteLoading,
      isDeletingArchivedNoteSuccess,
      isDeletingArchivedNoteError,
      isArchivedSuccessfully,
      isFailedToArchive,
      isUnArchivingSuccessfully,
      isFailedToUnArchive,
    ]
  );

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
