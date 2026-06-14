import { createBrowserRouter } from "react-router-dom";

import Top from "./pages/Top";
import OrganizerLogin from "./pages/OrganizerLogin";
import OrganizerRegister from "./pages/OrganizerRegister";
import CircleHome from "./pages/CircleHome";
import EventCreate from "./pages/EventCreate";
import RSVP from "./pages/RSVP";
import PinSetup from "./pages/PinSetup";
import DayLogin from "./pages/DayLogin";
import DayPage from "./pages/DayPage";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/login",
    element: <OrganizerLogin />,
  },
  {
    path: "/register",
    element: <OrganizerRegister />,
  },
  {
    path: "/circle",
    element: <CircleHome />,
  },
  {
    path: "/event/create",
    element: <EventCreate />,
  },
  {
    path: "/rsvp",
    element: <RSVP />,
  },
  {
    path: "/pin",
    element: <PinSetup />,
  },
  {
    path: "/day/login",
    element: <DayLogin />,
  },
  {
    path: "/day",
    element: <DayPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);