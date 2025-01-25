import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteNote(
  userId: string | undefined,
  token: string | undefined,
  unique_id: string,
  branch: "saved-notes" | "archived-notes"
) {
  if (!userId) {
    throw new Error("User ID is required to delete a note.");
  } else if (!token) {
    throw new Error("User token is required to delete a note.");
  }
  
  const response = await fetch(
    `https://note-taking-web-app-e627a-default-rtdb.firebaseio.com/users/${userId}/${branch}/${unique_id}.json?auth=${token}`,
    {
      method: "DELETE", // Specify the DELETE method
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to delete note with ID ${unique_id}. Please try again later.`
    );
  }
}

export default function useDeleteNote(
  userId: string | undefined,
  token: string | undefined,
  branch: "saved-notes" | "archived-notes"
) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, reset } = useMutation({
    mutationFn: (unique_id: string) =>
      deleteNote(userId, token, unique_id, branch),

    onSuccess: () => {
      queryClient.invalidateQueries([branch, userId, token]);
    },
    onError: () => {
      console.error("Failed to delete the note.");
    },
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
