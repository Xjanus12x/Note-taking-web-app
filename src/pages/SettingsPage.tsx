import SettingList from "../components/SettingList";
import { useUser } from "../context/AuthContext";
import { SettingType } from "../models/Setting";
import { useUserSettings } from "../context/SettingsContext";
import NotificationModal from "../ui/modals/NotificationModal";
import { COLOR_SETTINGS, FONT_SETTINGS } from "../constants/SettingsData";
import useDebounce from "../hooks/useDebounce";
import Icon, { IconType } from "../ui/icons";

export default function SettingsPage() {
  const { signOut } = useUser();
  return (
    <section className="px-4 py-5 space-y-4 lg:max-w-2xl md:text-xl md:px-8 md:py-8 lg:px-10 lg:py-10 lg:text-2xl">
      <header>
        <h2 className="font-bold ">Settings</h2>
      </header>
      <ul className="font-medium divide-y-2 divide-border-2">
        <li>
          <Setting icon="sun" label="Color Theme" settings={COLOR_SETTINGS} />
        </li>
        <li>
          <Setting
            icon="fontType"
            label="Font Theme"
            settings={FONT_SETTINGS}
          />
        </li>
        <li>
          <button
            aria-label="Logout of your account"
            className="flex items-center gap-2 p-4 lg:text-base"
            onClick={signOut}
          >
            <Icon type="logout" />
            Logout
          </button>
        </li>
      </ul>
    </section>
  );
}

type SettingProps = {
  icon: IconType;
  label: string;
  settings: SettingType[];
};
function Setting({ icon, label, settings }: SettingProps) {
  const {
    settingsData,
    defaultSettings,
    isSuccess,
    isError,
    handleSettingsChange,
  } = useUserSettings();
  const isSettingsAppliedDebounced = useDebounce(isSuccess);

  return (
    <>
      <div className="collapse">
        <input type="checkbox" />
        <div className="text-xl font-medium collapse-title lg:text-base">
          <span className="flex gap-1">
            <Icon type={icon} />
            {label}
          </span>
        </div>
        <div className="collapse-content">
          <SettingList
            settings={settings}
            onChange={handleSettingsChange}
            activeFontSetting={settingsData?.font ?? defaultSettings.font}
            activeThemeSetting={settingsData?.theme ?? defaultSettings.theme}
            isDisabled={isSettingsAppliedDebounced || isError}
          />
        </div>
      </div>

      <NotificationModal
        isVisible={isSettingsAppliedDebounced || isError}
        message={
          isError
            ? "An error occurred while updating your settings. Please try again."
            : "Your settings have been successfully updated!"
        }
        status={isSettingsAppliedDebounced ? "success" : "failed"}
      />
    </>
  );
}
