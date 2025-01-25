import { Note } from "../models/Note";
import { NavLink, Outlet } from "react-router-dom";
import logoBlack from "../assets/logo.svg";
import logoWhite from "../assets/logo_white.svg";
import SearchBar from "../ui/Searchbar";
import Icon from "../ui/icons";
import TagList from "../components/TagList";
import NoteList from "../components/NoteList";
import { useNotes } from "../context/NotesContext";
import EmptyNoteState from "../components/EmptyNoteState";
import { Theme } from "../models/Setting";
import { useUserSettings } from "../context/SettingsContext";

export default function DesktopLayout() {
  const {
    isArchivedNote,
    getNotes,
    searchSavedNotes,
    getNoteTags,
  } = useNotes();
  const notes = getNotes(isArchivedNote);
  const savedNoteTags = getNoteTags(false);
  const { settingsData } = useUserSettings();

  return (
    <div
      className="flex items-stretch overflow-hidden h-dvh bg-background text-color"
      id="desktop-root"
    >
      <aside className="w-full min-h-full px-4 space-y-3 border-r-2 divide-y-2 divide-border-2 border-r-border max-w-64">
        <SideNav theme={settingsData?.theme ?? "light"} />
        <Tags tags={savedNoteTags} />
      </aside>
      <main className="w-full">
        <section className="grid h-full grid-rows-[auto_1fr] grid-cols-[auto_1fr]">
          <Header
            onSearch={searchSavedNotes}
            isArchivedNotes={isArchivedNote}
          />
          <DesktopNoteList
            data={notes}
            isSavedNotes={!isArchivedNote}
            isArchivedNotes={isArchivedNote}
          />
          <Outlet />
        </section>
      </main>
    </div>
  );
}
type HeaderProps = {
  onSearch: (query: string) => void;
  isArchivedNotes: boolean;
};
function Header({ onSearch, isArchivedNotes }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-3 border-b-2 border-b-border col-span-full">
      <h2 className="text-2xl font-bold">
        {isArchivedNotes ? "Archived Notes" : "All Notes"}
      </h2>
      <div className="inline-flex items-center max-w-lg gap-2 grow">
        <SearchBar onSearch={onSearch} />
        <NavLink aria-label="Go to settings page" to="/notes/settings">
          <Icon type="settings" />
        </NavLink>
      </div>
    </header>
  );
}
type SideNavProps = {
  theme: Theme;
};
function SideNav({ theme }: SideNavProps) {
  return (
    <div>
      <header className="py-6">
        <img
          src={theme === "light" ? logoBlack : logoWhite}
          aria-hidden="true"
        />
      </header>

      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center justify-between p-2 rounded-md  ${
                  isActive ? "bg-background-2" : ""
                }`
              }
              to="/notes"
            >
              <span className="inline-flex items-center gap-2">
                <Icon type="home" />
                All Notes
              </span>
              <Icon type="arrow-right" />
            </NavLink>
          </li>

          {/* Archived Notes NavLink */}
          <li>
            <NavLink
              className={({ isActive }) =>
                `flex items-center justify-between p-2 rounded-md ${
                  isActive ? "bg-background-2" : ""
                }`
              }
              to="/archives"
            >
              <span className="inline-flex items-center gap-2">
                <Icon type="archive" />
                Archived Notes
              </span>
              <Icon type="arrow-right" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

type TagsProps = {
  tags: string[];
};
function Tags({ tags }: TagsProps) {
  return (
    <section className="py-2 space-y-3">
      <header>
        <h2 className="text-lg font-medium">Tags</h2>
      </header>
      <TagList to="/notes" tagContainerClassName="grid gap-2.5" tags={tags} />
    </section>
  );
}

type DesktopNoteListProps = {
  data: Note[] | undefined;
  isSavedNotes: boolean;
  isArchivedNotes?: boolean;
};

function DesktopNoteList({
  data,
  isSavedNotes,
  isArchivedNotes,
}: DesktopNoteListProps) {
  return (
    <section className="relative px-4 py-5 space-y-4 overflow-auto border-r-2 border-r-border w-72">
      {isSavedNotes && (
        <NavLink
          to={`/notes/view/${Date.now()}`}
          className="flex items-center justify-center py-1.5 font-medium bg-background-4 hover:bg-background-5 focus-visible:bg-background-5 rounded-full text-color-3"
        >
          <Icon type="plus" />
          Create New Note
        </NavLink>
      )}

      {data?.length === 0 && !isArchivedNotes && (
        <EmptyNoteState message="No saved notes found. Start by creating a new note!" />
      )}
      {data?.length === 0 && isArchivedNotes && (
        <EmptyNoteState message="No notes have been archived yet. Move notes here for safekeeping, or create a new note." />
      )}

      <NoteList
        data={data}
        to={`${isSavedNotes ? "/notes/view" : "/archives/view"}`}
        containerClassName="space-y-4"
      />
    </section>
  );
}
