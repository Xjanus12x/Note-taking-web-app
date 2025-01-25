import arrowLeft from "../assets/icons/Arrow - Left 2.svg";
// import deleteIcon from "../assets/icons/Delete.svg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NoteEditor from "../components/NoteEditor";
import Icon from "../ui/icons";
import { useConfirmationModal } from "../context/ModalContext";
import { useNotes } from "../context/NotesContext";
import { useRef } from "react";
import NoteModals from "../components/NoteModals";
import Button from "../ui/Button";

export default function MobileNotePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const noteEditorRef = useRef<{ triggerSubmit: () => void } | null>(null);
  const {
    isArchiveButtonTriggered,
    isDeleteButtonTriggered,
    setIsArchiveButtonTriggered,
    setIsDeleteButtonTriggered,
  } = useConfirmationModal();
  const {
    isArchivedNote,
    isAddingNewNoteSuccess,
    isUpdatingNoteSuccess,
    isUpdatingNoteError,
    isAddingNewNoteError,
    isFailedToDeleteSavedNote,
    isDeletingArchivedNoteSuccess,
    isDeletingArchivedNoteError,
    isUpdatingArchivedNoteSuccess,
    isUpdatingArchivedNoteError,
    isArchivedSuccessfully,
    isFailedToUnArchive,
    isDeletingSavedNoteSuccess,
    isFailedToArchive,
    isUnArchivingSuccessfully,
    isDisable,
    handleDisableButtons,
    getNoteById,
    saveNote,
    deleteNote,
    toggleArchiveStatus,
  } = useNotes();

  const noteData = getNoteById(Number(id), isArchivedNote);

  if (isUnArchivingSuccessfully) return <Navigate to="/archives" />;
  return (
    <section className="grid min-h-full gap-2 p-4 grid-rows-[auto_1fr]">
      <header className="flex justify-between gap-3">
        <button
          className="flex items-center mr-auto"
          onClick={() => navigate(-1)}
          aria-label="Go back to the previous page"
        >
          <img src={arrowLeft} aria-hidden="true" />
          Go Back
        </button>
        {noteData.isSaved && (
          <>
            <Button
              onClick={() => setIsArchiveButtonTriggered(true)}
              aria-label={`${
                isArchivedNote ? "Restore from archive" : "Archive"
              } this note`}
              aria-haspopup="dialog"
              aria-expanded={isArchiveButtonTriggered}
              aria-controls="confirmation-modal"
              disabled={isDisable}
            >
              <Icon type="archive" />
            </Button>
            <Button
              onClick={() => setIsDeleteButtonTriggered(true)}
              aria-label="Delete Note"
              aria-haspopup="dialog"
              aria-expanded={isDeleteButtonTriggered}
              aria-controls="confirmation-modal"
              disabled={isDisable}
            >
              <Icon type="delete" />
            </Button>
          </>
        )}

        <Button
          onClick={() => {
            noteEditorRef.current?.triggerSubmit();
            handleDisableButtons();
          }}
          aria-haspopup="dialog"
          aria-expanded={
            isAddingNewNoteSuccess ||
            isUpdatingNoteSuccess ||
            isUpdatingArchivedNoteSuccess ||
            isAddingNewNoteError ||
            isUpdatingNoteError ||
            isUpdatingArchivedNoteError
          }
          aria-controls="notification-modal"
          disabled={isDisable}
        >
          Save Note
        </Button>
      </header>

      <NoteEditor
        ref={noteEditorRef}
        noteData={noteData}
        onSave={saveNote}
        isArchivedNote={isArchivedNote}
      />

      <NoteModals
        isArchivedNote={isArchivedNote}
        isDeleteButtonTriggered={isDeleteButtonTriggered}
        setIsDeleteButtonTriggered={setIsDeleteButtonTriggered}
        noteData={noteData}
        deleteNote={deleteNote}
        isArchiveButtonTriggered={isArchiveButtonTriggered}
        setIsArchiveButtonTriggered={setIsArchiveButtonTriggered}
        toggleArchiveStatus={toggleArchiveStatus}
        isAddingNewNoteSuccess={isAddingNewNoteSuccess}
        isAddingNewNoteError={isAddingNewNoteError}
        isUpdatingNoteSuccess={isUpdatingNoteSuccess}
        isUpdatingNoteError={isUpdatingNoteError}
        isUpdatingArchivedNoteSuccess={isUpdatingArchivedNoteSuccess}
        isUpdatingArchivedNoteError={isUpdatingArchivedNoteError}
        isDeletingSavedNoteSuccess={isDeletingSavedNoteSuccess}
        isFailedToDeleteSavedNote={isFailedToDeleteSavedNote}
        isDeletingArchivedNoteSuccess={isDeletingArchivedNoteSuccess}
        isDeletingArchivedNoteError={isDeletingArchivedNoteError}
        isArchivedSuccessfully={isArchivedSuccessfully}
        isFailedToArchive={isFailedToArchive}
        isUnArchivingSuccessfully={isUnArchivingSuccessfully}
        isFailedToUnArchive={isFailedToUnArchive}
      />
    </section>
  );
}
