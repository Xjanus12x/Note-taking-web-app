import { Link } from "react-router-dom";
import Icon from "../ui/icons";
import NoteList from "../components/NoteList";
import Loading from "../ui/Loading";
import SearchBar from "../ui/Searchbar";
import { useNotes } from "../context/NotesContext";
import EmptyNoteState from "../components/EmptyNoteState";

export default function MobileHomePage() {
  const { getNotes, isLoadingSavedNotes, searchSavedNotes } = useNotes();
  const savedNotes = getNotes(false);
  return (
    <section className={`p-4 ${savedNotes?.length === 0 ? "space-y-4" : ""}`}>
      <SearchBar onSearch={searchSavedNotes} />

      {isLoadingSavedNotes && <Loading />}
      {savedNotes?.length === 0 && !isLoadingSavedNotes && (
        <EmptyNoteState message="No saved notes found. Start by creating a new note!" />
      )}
      {savedNotes && !isLoadingSavedNotes && (
        <NoteList data={savedNotes} to="/notes" />
      )}

      <Link
        to={`/notes/${Date.now()}`}
        className="fixed z-50 grid rounded-full bg-background-4 text-color-3 size-14 place-content-center right-6 bottom-20 md:bottom-28"
      >
        <Icon type="plus" />
      </Link>
    </section>
  );
}
