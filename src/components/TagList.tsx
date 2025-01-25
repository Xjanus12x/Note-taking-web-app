import { Link } from "react-router-dom";
import Icon from "../ui/icons";

type TagListProps = {
  to: string;
  tags: string[];
  tagContainerClassName?: string;
  tagClassName?: string;
};
export default function TagList({
  to,
  tags,
  tagContainerClassName,
  tagClassName,
}: TagListProps) {
  return (
    <ul className={tagContainerClassName}>
      {tags.map((tag) => (
        <Link
          to={{ pathname: to, search: `?tag=${tag}` }}
          className={`inline-flex gap-1 cursor-pointer items-center ${tagClassName}`}
          key={tag}
        >
          <Icon type="tag" />
          {tag}
        </Link>
      ))}
    </ul>
  );
}
