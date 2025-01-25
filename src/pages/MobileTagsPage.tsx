import TagList from "../components/TagList";
import { useNotes } from "../context/NotesContext";

export default function MobileTagsPage() {
  const { getNoteTags } = useNotes();
  return (
    <section className="p-4 space-y-2 divide-y">
      <header>
        <h2 className="text-xl font-bold">Tags</h2>
      </header>
      <TagList
        to="/"
        tags={getNoteTags(false)}
        tagContainerClassName="grid grid-cols-2 text-lg gap-2 py-4 md:grid-cols-4"
        tagClassName="border p-2 items-center rounded-md"
      />
    </section>
  );
}
