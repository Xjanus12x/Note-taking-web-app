import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StylePreferences } from "../models/Setting";

const api =
  "https://note-taking-web-app-e627a-default-rtdb.firebaseio.com/users";

async function fetchSettings(
  userId: string | undefined,
  token: string
): Promise<StylePreferences> {
  if (!userId) {
    throw new Error("User ID is required to fetch settings.");
  }

  const response = await fetch(`${api}/${userId}/settings.json?auth=${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch settings for user ID: ${userId}. Server responded with status: ${response.status} (${response.statusText}).`
    );
  }

  const data = await response.json();
  return data;
}

async function updateSettings(
  userId: string | undefined,
  token: string,
  settings: StylePreferences
) {
  if (!userId) {
    throw new Error("User ID is required to update settings.");
  }

  const response = await fetch(`${api}/${userId}/settings.json?auth=${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to update settings. Server responded with: ${errorText}`
    );
  }
}

export default function useSettings(userId: string | undefined, token: string) {
  const queryClient = useQueryClient();

  const {
    data: settingsData,
    isLoading: isFetchingSettings,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
  } = useQuery({
    queryFn: () => fetchSettings(userId, token),
    queryKey: ["settings", userId, token],
    enabled: !!userId && !!token,
    staleTime: Infinity,
    retry: false,
  });

  const {
    mutate: setSettings,
    isLoading: isUpdatingSettings,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    reset,
  } = useMutation({
    mutationFn: (settings: StylePreferences) =>
      updateSettings(userId, token, settings),
    onSuccess: () => {
      queryClient.invalidateQueries(["settings", userId, token]); // Forces refetch of "settings" data
    },
    onSettled: () => {
      setTimeout(() => reset(), 2000);
    },
  });

  return {
    settingsData,
    isFetchingSettings,
    isFetchSuccess,
    isFetchError,

    setSettings,
    isUpdatingSettings,
    isUpdateSuccess,
    isUpdateError,
  };
}
