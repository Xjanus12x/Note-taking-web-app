import { useParams } from "react-router-dom";
import { useRef } from "react";
import NoteEditor from "../components/NoteEditor";
import { useConfirmationModal } from "../context/ModalContext";
import { useNotes } from "../context/NotesContext";
import NoteModals from "../components/NoteModals";
import Button from "../ui/Button";
import Icon from "../ui/icons";

export default function DesktopNoteLayout() {
  const { id } = useParams();
  const currentId = Number(id);
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
  const noteData = getNoteById(currentId, isArchivedNote);
  const noteEditorRef = useRef<{ triggerSubmit: () => void } | null>(null);

  return (
    <section className="inline-grid grid-cols-[1fr_auto]">
      <NoteEditor
        ref={noteEditorRef}
        noteData={noteData}
        onSave={saveNote}
        isArchivedNote={isArchivedNote}
      />

      <aside className="grid content-start w-64 h-full gap-3 px-4 py-5 border-l-2 border-l-border">
        {noteData.isSaved && (
          <>
            <Button
              onClick={() => setIsArchiveButtonTriggered(true)}
              aria-haspopup="dialog"
              aria-expanded={isArchiveButtonTriggered}
              aria-controls="confirmation-modal"
              disabled={isDisable}
            >
              <Icon type="archive" />
              {isArchivedNote ? "Un-Archive Note" : "Archive Note"}
            </Button>
            <Button
              onClick={() => setIsDeleteButtonTriggered(true)}
              aria-haspopup="dialog"
              aria-expanded={isDeleteButtonTriggered}
              aria-controls="confirmation-modal"
              disabled={isDisable}
            >
              <Icon type="delete" />
              Delete Note
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
      </aside>

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
