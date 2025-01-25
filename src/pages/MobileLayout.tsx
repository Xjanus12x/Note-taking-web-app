import { NavLink } from "react-router-dom";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import Icon from "../ui/icons";
import logoBlack from "../assets/logo.svg";
import logoWhite from "../assets/logo_white.svg";
import { Theme } from "../models/Setting";
import { useUserSettings } from "../context/SettingsContext";

export default function MobileLayout() {
  const { settingsData } = useUserSettings();
  return (
    <div
      className="grid h-svh grid-rows-[auto_1fr] overflow-hidden bg-background text-color"
      id="mobile-root"
    >
      <MobileHeader theme={settingsData?.theme ?? "light"} />
      <main className="grid h-full pb-12 overflow-y-auto">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
}

type MobileHeaderProps = {
  theme: Theme;
};
function MobileHeader({ theme }: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-lightBlueGray">
      <img src={theme === "light" ? logoBlack : logoWhite} aria-hidden="true" />
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-0 top-auto shadow-xl">
      <ul className="flex flex-wrap justify-center py-3 border-t border-t-nav-border-clr bg-background border-t-border-3">
        <li>
          <NavItem to="/" ariaLabel="Navigate to home page">
            <Icon type="home" />
            <span className="hidden md:block">Home</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/archive" ariaLabel="Navigate to archive page">
            <Icon type="archive" />
            <span className="hidden md:block">Archive</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/tags" ariaLabel="Navigate to tags page">
            <Icon type="tag" />
            <span className="hidden md:block">Tags</span>
          </NavItem>
        </li>
        <li>
          <NavItem to="/settings" ariaLabel="Navigate to settings page">
            <Icon type="settings" />
            <span className="hidden md:block">Settings</span>
          </NavItem>
        </li>
      </ul>
    </nav>
  );
}

type NavItemProps = PropsWithChildren & {
  to: string;
  ariaLabel: string;
};
function NavItem({ to, ariaLabel, children }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `grid justify-items-center px-5 py-1 text-center md:px-10 md:py-2 ${
          isActive ? "bg-background-2" : ""
        }`
      }
      aria-label={ariaLabel}
    >
      {children}
    </NavLink>
  );
}
