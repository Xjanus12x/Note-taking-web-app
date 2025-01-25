import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "../models/Note";

async function updateNote(
  userId: string | undefined,
  token: string,
  branch: "saved-notes" | "archived-notes",
  updatedFields: Partial<Note>
) {
  if (!userId) {
    throw new Error("User ID is required to update a note.");
  }
  const { unique_id, ...rest } = updatedFields;

  const response = await fetch(
    `https://note-taking-web-app-e627a-default-rtdb.firebaseio.com/users/${userId}/${branch}/${unique_id}.json?auth=${token}`,
    {
      method: "PATCH", // Use PATCH for partial updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest), // Only send the fields to update
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update the note with ID ${unique_id} for user ${userId}.`
    );
  }
}

export default function useUpdateNote(
  userId: string | undefined,
  token: string,
  branch: "saved-notes" | "archived-notes"
) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, reset } = useMutation({
    mutationFn: (updatedFields: Partial<Note>) =>
      updateNote(userId, token, branch, updatedFields),
    onSuccess: () => {
      queryClient.invalidateQueries([branch, userId, token]);
    },
    onError: () => {},
    onSettled: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
  };
}
