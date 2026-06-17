import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import mock from "./mockData";
import { AppContext } from "./AppContext";

import Top from "./pages/Top";
import OrganizerLogin from "./pages/auth/OrganizerLogin";
import OrganizerRegister from "./pages/auth/OrganizerRegister";
import RSVP from "./pages/auth/RSVP";
import JoinRoom from "./pages/auth/JoinRoom";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminSettings from "./pages/admin/AdminSettings";

import EventList from "./pages/event/EventList";
import EventDetail from "./pages/event/EventDetail";
import EventCreate from "./pages/event/EventCreate";

import MemberList from "./pages/member/MemberList";
import ParticipantList from "./pages/event/ParticipantList";
import SeatPage from "./pages/event/SeatPage";
import ReceptionPage from "./pages/event/ReceptionPage";

export default function App() {
  const [events, setEvents] = useState(mock.events);

  return (
    <AppContext.Provider value={{ events, setEvents }}>
      <BrowserRouter>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/login" element={<OrganizerLogin />} />
            <Route path="/register" element={<OrganizerRegister />} />
            <Route path="/join/:groupId" element={<RSVP />} />
            <Route path="/join" element={<JoinRoom />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="events" element={<EventList />} />
              <Route path="events/create" element={<EventCreate />} />
              <Route path="events/:eventId" element={<EventDetail />} />
              <Route path="events/:eventId/participants" element={<ParticipantList />} />
              <Route path="events/:eventId/seats" element={<SeatPage />} />
              <Route path="events/:eventId/reception" element={<ReceptionPage />} />
              <Route path="members" element={<MemberList />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}