import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../models/Note";

async function addNewNote(
  userId: string | undefined,
  token: string,
  branch: "saved-notes" | "archived-notes",
  note: Note
) {
  const response = await fetch(
    `https://note-taking-web-app-e627a-default-rtdb.firebaseio.com/users/${userId}/${branch}.json?auth=${token}`,
    {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to add new note for user with ID ${userId}. Please try again later.`
    );
  }
}

export default function useAddNewNote(
  userId: string | undefined,
  token: string,
  branch: "saved-notes" | "archived-notes"
) {
  const queryClient = useQueryClient();
  const { mutate, reset, isLoading, isSuccess, isError } = useMutation({
    mutationFn: (note: Note) => addNewNote(userId, token, branch, note),
    // On successful addition, invalidate the 'users' query to refetch the latest data
    onSuccess: () => {
      queryClient.invalidateQueries([branch, userId, token]);
    },
    onError: (error) => {
      console.error("Failed to add user:", error);
    },
    onSettled: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return {
    isLoading,
    isSuccess,
    isError,
    mutate,
    reset,
  };
}
