import { createBrowserRouter } from "react-router-dom";
import Providers from "../Providers";
import SignInPage from "../pages/auth/SignInPage";
import AuthLayout from "../pages/auth/AuthLayout";
import SignUpPage from "../pages/auth/SignUpPage";
import AuthProtectedRoute from "./AuthProtectedRoute";
import DesktopLayout from "../pages/DesktopLayout";
import MobileLayout from "../pages/MobileLayout";
import MobileNotePage from "../pages/MobileNotePage";
import MobileArchiveNotesPage from "../pages/MobileArchiveNotesPage";
import MobileTagsPage from "../pages/MobileTagsPage";
import MobileHomePage from "../pages/MobileHomePage";
import SettingsPage from "../pages/SettingsPage";
import DesktopNoteLayout from "../pages/DesktopNoteLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      // private routes
      {
        path: "/",
        element: <AuthProtectedRoute />,

        children: [
          {
            element: <MobileLayout />,
            children: [
              { index: true, element: <MobileHomePage /> },
              { path: "notes/:id", element: <MobileNotePage /> },
              {
                path: "archive",
                element: <MobileArchiveNotesPage />,
              },
              {
                path: "archive/note/:id",
                element: <MobileNotePage />,
              },
              { path: "tags", element: <MobileTagsPage /> },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
          {
            path: "notes",
            element: <DesktopLayout />,
            children: [
              {
                path: "view/:id",
                element: <DesktopNoteLayout />,
              },
              {
                path: "settings",
                element: <SettingsPage />,
              },
            ],
          },
          {
            path: "archives",
            element: <DesktopLayout />,
            children: [
              {
                path: "view/:id",
                element: <DesktopNoteLayout />,
              },
            ],
          },
        ],
      },

      // Public routes
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <SignInPage />,
          },
          {
            path: "/auth/sign-in",
            element: <SignInPage />,
          },

          {
            path: "/auth/sign-up",
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //   },
]);

export default router;
