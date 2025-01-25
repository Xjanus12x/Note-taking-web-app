import taskEmpty from "../assets/Task_empty.svg";
type EmptyNoteStateProps = {
  message: string;
};
export default function EmptyNoteState({ message }: EmptyNoteStateProps) {
  return (
    <article className="grid p-4 text-center rounded-md justify-items-center bg-background-2">
      <img className="size-20" src={taskEmpty} alt="" aria-hidden="true" />
      <p>{message}</p>
    </article>
  );
}
