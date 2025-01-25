import { NavLink } from "react-router-dom";
import { NoteTitleAndMetaDataType } from "../models/Note";
import { Note } from "../models/Note";
import { AnimatePresence, motion } from "framer-motion";

type NoteListProps = {
  containerClassName?: string;
  childClassName?: string;
  data: Note[] | undefined;
  to: string;
};
export default function NoteList({
  containerClassName,
  childClassName,
  data,
  to,
}: NoteListProps) {
  return (
    <ul className={containerClassName}>
      <AnimatePresence>
        {data?.map((note, i) => (
          <motion.li
            className={childClassName}
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <NavLink
              to={`${to}/${note.id}`}
              className={({ isActive }) =>
                `hover:bg-background-2 focus-visible:bg-background-2 ${
                  isActive ? "bg-background-2" : ""
                }`
              }
            >
              <NoteTitleAndMetaData {...note} />
            </NavLink>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

type NoteTitleAndMetaDataProps = NoteTitleAndMetaDataType;
function NoteTitleAndMetaData({
  title,
  tags,
  lastEdited,
}: NoteTitleAndMetaDataProps) {
  return (
    <div className="grid gap-3 px-2 py-3 rounded-md bg-inherit md:px-3 lg:px-4 lg:py-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <li
            className="px-1.5 rounded-sm bg-background-3 text-color-2 font-medium"
            key={i}
          >
            {tag}
          </li>
        ))}
      </ul>
      <span className="text-clr-3">{lastEdited}</span>
    </div>
  );
}
