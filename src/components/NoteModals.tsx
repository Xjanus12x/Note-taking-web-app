import React from "react";
import ConfirmationModal from "../ui/modals/ConfirmationModal";
import NotificationModal from "../ui/modals/NotificationModal";
import { Note } from "../models/Note";

type NoteModalsProps = {
  isArchivedNote: boolean;
  isDeleteButtonTriggered: boolean;
  setIsDeleteButtonTriggered: (value: boolean) => void;
  noteData: Note;
  deleteNote: (id: string, isArchived: boolean) => void;
  isArchiveButtonTriggered: boolean;
  setIsArchiveButtonTriggered: (value: boolean) => void;
  toggleArchiveStatus: (note: any, isArchived: boolean) => void;
  isAddingNewNoteSuccess: boolean;
  isAddingNewNoteError: boolean;
  isUpdatingNoteSuccess: boolean;
  isUpdatingNoteError: boolean;
  isUpdatingArchivedNoteSuccess: boolean;
  isUpdatingArchivedNoteError: boolean;
  isDeletingSavedNoteSuccess: boolean;
  isFailedToDeleteSavedNote: boolean;
  isDeletingArchivedNoteSuccess: boolean;
  isDeletingArchivedNoteError: boolean;
  isArchivedSuccessfully: boolean;
  isFailedToArchive: boolean;
  isUnArchivingSuccessfully: boolean;
  isFailedToUnArchive: boolean;
};

const NoteModals: React.FC<NoteModalsProps> = ({
  isArchivedNote,
  isDeleteButtonTriggered,
  setIsDeleteButtonTriggered,
  noteData,
  deleteNote,
  isArchiveButtonTriggered,
  setIsArchiveButtonTriggered,
  toggleArchiveStatus,
  isAddingNewNoteSuccess,
  isAddingNewNoteError,
  isUpdatingNoteSuccess,
  isUpdatingNoteError,
  isUpdatingArchivedNoteSuccess,
  isUpdatingArchivedNoteError,
  isDeletingSavedNoteSuccess,
  isFailedToDeleteSavedNote,
  isDeletingArchivedNoteSuccess,
  isDeletingArchivedNoteError,
  isArchivedSuccessfully,
  isFailedToArchive,
  isUnArchivingSuccessfully,
  isFailedToUnArchive,
}) => (
  <>
    <ConfirmationModal
      title={isArchivedNote ? "Delete Archived Note" : "Delete Saved Note"}
      description={
        isArchivedNote
          ? "Are you sure you want to permanently delete this archived note? This action cannot be undone."
          : "Are you sure you want to permanently delete this saved note? This action cannot be undone."
      }
      isOpen={isDeleteButtonTriggered}
      confirmButtonLabel={
        isArchivedNote ? "Delete Archived Note" : "Delete Saved Note"
      }
      onCancel={() => setIsDeleteButtonTriggered(false)}
      onConfirm={() => {
        if (noteData.unique_id) {
          deleteNote(noteData.unique_id, isArchivedNote);
          setIsDeleteButtonTriggered(false);
        }
      }}
    />

    <ConfirmationModal
      title={isArchivedNote ? "Un-archive Note" : "Archive Note"}
      description={
        isArchivedNote
          ? "Are you sure you want to un-archive this note? It will move back to the saved notes section."
          : "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
      }
      isOpen={isArchiveButtonTriggered}
      confirmButtonLabel={isArchivedNote ? "Un-archive Note" : "Archive Note"}
      onCancel={() => setIsArchiveButtonTriggered(false)}
      onConfirm={() => {
        toggleArchiveStatus(noteData, isArchivedNote);
        setIsArchiveButtonTriggered(false);
      }}
    />

    <NotificationModal
      isVisible={isAddingNewNoteSuccess || isAddingNewNoteError}
      status={isAddingNewNoteError ? "failed" : "success"}
      message={
        isAddingNewNoteError
          ? "Failed to save note."
          : "Note saved successfully!"
      }
    />

    <NotificationModal
      isVisible={isUpdatingNoteSuccess || isUpdatingNoteError}
      status={isUpdatingNoteError ? "failed" : "success"}
      message={
        isUpdatingNoteError
          ? "Failed to update note."
          : "Note updated successfully!"
      }
    />

    <NotificationModal
      isVisible={isUpdatingArchivedNoteSuccess || isUpdatingArchivedNoteError}
      status={isUpdatingArchivedNoteError ? "failed" : "success"}
      message={
        isUpdatingArchivedNoteError
          ? "Failed to update archived note."
          : "Archived Note updated successfully!"
      }
    />

    <NotificationModal
      isVisible={isDeletingSavedNoteSuccess || isFailedToDeleteSavedNote}
      status={isFailedToDeleteSavedNote ? "failed" : "success"}
      message={
        isFailedToDeleteSavedNote
          ? "Failed to delete note."
          : "Note deleted successfully."
      }
    />

    <NotificationModal
      isVisible={isDeletingArchivedNoteSuccess || isDeletingArchivedNoteError}
      status={isDeletingArchivedNoteError ? "failed" : "success"}
      message={
        isDeletingArchivedNoteError
          ? "Failed to delete archived note."
          : "Archived Note deleted successfully."
      }
    />

    <NotificationModal
      isVisible={isArchivedSuccessfully || isFailedToArchive}
      status={isFailedToArchive ? "failed" : "success"}
      message={
        isFailedToArchive
          ? "Failed to archive note."
          : "Note archived successfully!"
      }
    />

    <NotificationModal
      isVisible={isUnArchivingSuccessfully || isFailedToUnArchive}
      status={isFailedToUnArchive ? "failed" : "success"}
      message={
        isFailedToUnArchive
          ? "Failed to un-archive note."
          : "Note un-archived successfully!"
      }
    />
  </>
);

export default NoteModals;
