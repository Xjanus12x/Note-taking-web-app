import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { useUser } from "./AuthContext";
import useSettings from "../hooks/useSettings";
import { FontStyles, StylePreferences, Theme } from "../models/Setting";
import { useBreakpoints } from "../hooks/useBreakpoints";

type SettingsContextType = {
  settingsData: StylePreferences | undefined;
  defaultSettings: StylePreferences;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleSettingsChange(theme?: Theme, font?: FontStyles): void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function useUserSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useUserSettings must be used inside SettingsProvider");
  }
  return context;
}
const defaultSettings: StylePreferences = {
  theme: "light",
  font: "sans-serif",
};
type SettingsProviderProps = PropsWithChildren;
export default function SettingsProvider({ children }: SettingsProviderProps) {
  const { user, token } = useUser();
  const {
    settingsData,
    isFetchingSettings,
    isFetchSuccess,
    isFetchError,

    isUpdatingSettings,
    isUpdateSuccess,
    isUpdateError,
    setSettings,
  } = useSettings(user?.uid, token!);
  const { isDesktop } = useBreakpoints();

  const isLoading = isFetchingSettings || isUpdatingSettings;
  const isSuccess = isFetchSuccess && isUpdateSuccess;
  const isError = isFetchError || isUpdateError;

  const desktopRoot = document.getElementById("desktop-root");
  const mobileRoot = document.getElementById("mobile-root");

  function handleSettingsChange(theme?: Theme, font?: FontStyles) {
    const updatedSettings = {
      ...(settingsData ?? defaultSettings),
      ...(theme && { theme }),
      ...(font && { font }),
    };
    setSettings(updatedSettings);
  }

  useEffect(() => {
    if (isDesktop) {
      desktopRoot?.setAttribute(
        "data-font",
        settingsData?.font ?? defaultSettings.font
      );
      desktopRoot?.setAttribute(
        "data-theme",
        settingsData?.theme ?? defaultSettings.theme
      );
    } else {
      mobileRoot?.setAttribute(
        "data-font",
        settingsData?.font ?? defaultSettings.font
      );
      mobileRoot?.setAttribute(
        "data-theme",
        settingsData?.theme ?? defaultSettings.font
      );
    }

    document
      .getElementById("root-portal")
      ?.setAttribute("data-font", settingsData?.font ?? defaultSettings.font);
  }, [settingsData, isDesktop]);

  return (
    <SettingsContext.Provider
      value={{
        settingsData,
        defaultSettings,
        isLoading,
        isSuccess,
        isError,
        handleSettingsChange,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
