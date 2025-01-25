import { Outlet } from "react-router-dom";
import { UserDataProvider } from "./context/AuthContext";
import ModalProvider from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsProvider from "./context/SettingsContext";
import NotesProvider from "./context/NotesContext";

const queryClient = new QueryClient();

export default function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDataProvider>
        <SettingsProvider>
          <NotesProvider>
            <ModalProvider>
              <Outlet />
            </ModalProvider>
          </NotesProvider>
        </SettingsProvider>
      </UserDataProvider>
    </QueryClientProvider>
  );
}
