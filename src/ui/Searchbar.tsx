import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import Icon from "./icons";
import Input from "./Input";
import { useBreakpoints } from "../hooks/useBreakpoints";

type SearchType = "tag" | "query";
type SearchBarProps = {
  onSearch: (query: string) => void;
};
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "";
  const query = searchParams.get("query") ?? "";
  const debouncedSearch = useDebounce(query);

  const { isMobile, isTablet } = useBreakpoints();

  useEffect(() => {
    onSearch(tag || debouncedSearch); // Call search handler with the debounced value
  }, [tag, debouncedSearch, onSearch]);

  const handleSearchChange = (query: string, searchType: SearchType) => {
    setSearchParams((params) => {
      if (query && searchType === "query") {
        params.set("query", query); // Update or add "query"
      } else if (query && searchType === "tag") {
        params.set("tag", query); // Update or add "tag"
      } else {
        params.delete("query"); // Remove "query"
        params.delete("tag"); // Remove "tag"
      }
      return params;
    });
  };

  return (
    <form className="w-full space-y-4 ">
      <div className="relative">
        <div className="absolute left-3 top-2/4 -translate-y-2/4">
          <Icon type="search" />
        </div>
        <Input
          className="py-2 pl-10 bg-transparent border-2 rounded-md outline-none lg:pl-12 lg:py-3 border-border"
          id="search"
          isSrOnlyLabel={true}
          label="Search by title, content, or tags..."
          placeholder="Search by title, content, or tags..."
          value={tag || query}
          onChange={(e) =>
            handleSearchChange(e.target.value, tag ? "tag" : "query")
          }
        />
      </div>
      {(debouncedSearch || tag) && (isMobile || isTablet) && (
        <p>
          All notes matching{" "}
          <span className="font-bold">"{debouncedSearch || tag}"</span> are
          displayed below.
        </p>
      )}
    </form>
  );
}
