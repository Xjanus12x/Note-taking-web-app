import { FontStyles, SettingType, Theme } from "../models/Setting";
import Icon from "../ui/icons";

type SettingListProps = {
  settings: SettingType[];
  activeThemeSetting?: Theme;
  activeFontSetting?: FontStyles;
  onChange: (theme?: Theme, font?: FontStyles) => void;
  isDisabled?: boolean;
};

export default function SettingList({
  settings,
  activeThemeSetting,
  activeFontSetting,
  onChange,
  isDisabled,
}: SettingListProps) {
  return (
    <form>
      <ul role="radiogroup" className="space-y-4">
        {settings.map(({ icon, title, description, font, theme }, index) => {
          const sanitizedId = title.replace(/\s+/g, "-").toLowerCase();
          return (
            <li
              key={index}
              className="flex items-center justify-between gap-4 p-4 border-2 rounded-md border-border-3 focus-within:ring-2 focus-within:ring-skyBlue"
              tabIndex={0}
            >
              <span
                className="p-2.5 border rounded-md border-border-3"
                aria-hidden="true"
              >
                <Icon type={icon} />
              </span>

              <header>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-color-4">{description}</p>
              </header>

              <label
                htmlFor={sanitizedId}
                className="inline-flex items-center bg-transparent"
              >
                <input
                  id={sanitizedId}
                  name="settings"
                  type="radio"
                  checked={
                    activeThemeSetting === theme || activeFontSetting === font
                  }
                  aria-checked={
                    activeThemeSetting === theme || activeFontSetting === font
                  }
                  onChange={() => onChange(theme, font)}
                  className="mr-2 bg-transparent "
                  tabIndex={0}
                  disabled={isDisabled}
                  aria-disabled={isDisabled}
                />
                <span className="sr-only">Select</span>
              </label>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
