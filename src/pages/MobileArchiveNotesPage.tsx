import EmptyNoteState from "../components/EmptyNoteState";
import NoteList from "../components/NoteList";
import Loading from "../ui/Loading";
import { useNotes } from "../context/NotesContext";

export default function MobileArchiveNotesPage() {
  const { getNotes, isArchivedNote, isLoadingArchivedNotes } = useNotes();
  const archivedNotes = getNotes(isArchivedNote);

  return (
    <section className={`p-4 ${archivedNotes?.length === 0 ? "space-y-4" : ""}`}>
      <header>
        <h2>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </h2>
      </header>

      {isLoadingArchivedNotes && <Loading />}
      {archivedNotes?.length === 0 && !isLoadingArchivedNotes && (
        <EmptyNoteState message="No notes have been archived yet. Move notes here for safekeeping, or create a new note." />
      )}
      {archivedNotes && !isLoadingArchivedNotes && (
        <NoteList data={archivedNotes} to="/archive/note" />
      )}
    </section>
  );
}
