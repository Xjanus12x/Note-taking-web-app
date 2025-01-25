import { useQuery } from "@tanstack/react-query";
import { Note } from "../models/Note";
import { useCallback, useEffect, useMemo, useState } from "react";

async function fetchNotes(
  userId: string | undefined,
  token: string | null,
  branch: "saved-notes" | "archived-notes"
): Promise<Note[]> {
  const response = await fetch(
    `https://note-taking-web-app-e627a-default-rtdb.firebaseio.com/users/${userId}/${branch}.json?auth=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch saved notes for user with ID ${userId}. Please try again later.`
    );
  }

  const data = await response.json();
  if (!data) {
    // Return an empty array if there are no saved notes
    return [] as Note[];
  }

  // Map through the keys for cleaner code
  return Object.entries(data).map(([key, note]) => ({
    unique_id: key,
    ...(note as Note),
  }));
}

export default function useFetcNotes(
  userId: string | undefined,
  token: string | null,
  branch: "saved-notes" | "archived-notes"
) {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => fetchNotes(userId, token, branch),
    queryKey: [branch, userId, token],
    enabled: !!userId && !!token,
  });

  const [fetchedData, setFetchedData] = useState<Note[] | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLocalLoading, setIsLocaLoading] = useState(false);

  const search = useCallback(
    (query: string) => {
      if (query) {
        const filteredNotes = data?.filter((note) => {
          const pattern = new RegExp(query, "i");
          return (
            pattern.test(note.title) ||
            pattern.test(note.content) ||
            (note.tags && note.tags.some((tag: string) => pattern.test(tag)))
          );
        });
        setFetchedData(filteredNotes ?? []);
      } else setFetchedData(data);
    },
    [data]
  );
  const noteTags = useMemo(
    () => Array.from(new Set(data?.flatMap((note) => note.tags))),
    [data]
  );
  useEffect(() => {
    if (isLoading) setIsLocaLoading(true);
    if (isSuccess) setFetchedData(data);
    setIsLocaLoading(false);
  }, [data, isLoading, isSuccess]);

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery]);

  return {
    fetchedData,
    isLocalLoading,
    noteTags,
    search,
    searchQuery,
    setSearchQuery,
  };
}
