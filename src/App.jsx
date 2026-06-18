
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import mock from "./mockData";
import { AppContext } from "./AppContext";

import Top from "./pages/top/Top";
import OrganizerLogin from "./pages/top/auth/OrganizerLogin";
import OrganizerRegister from "./pages/top/auth/OrganizerRegister";
import RSVP from "./pages/top/auth/RSVP";
import JoinRoom from "./pages/top/auth/JoinRoom";

import GroupCreate from "./pages/admin/group/GroupCreate"

import AdminLayout from "./pages/admin/AdminLayout";
import AdminSettings from "./pages/admin/AdminSettings";

import EventList from "./pages/admin/event/EventList";
import EventDetail from "./pages/admin/event/EventDetail";
import EventCreate from "./pages/admin/event/EventCreate";
import EventAnswer from "./pages/event/EventAnswer";

import MemberList from "./pages/admin/member/MemberList";
import ParticipantList from "./pages/admin/event/ParticipantList";

export default function App() {
  const [events, setEvents] = useState(mock.events);
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("eventer-members");

    if (savedMembers) {
      return JSON.parse(savedMembers);
    }

    return mock.members;
  });

  useEffect(() => {
    localStorage.setItem("eventer-members", JSON.stringify(members));
  }, [members]);

  return (
    <AppContext.Provider value={{ events, setEvents, members, setMembers }}>
      <BrowserRouter>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/login" element={<OrganizerLogin />} />
            <Route path="/group/create" element={<GroupCreate />} />
            <Route path="/register" element={<OrganizerRegister />} />
            <Route path="/join/:groupId" element={<RSVP />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/join/:groupId/events/:eventId" element={<EventAnswer />} />

            <Route path="/:groupId/admin" element={<AdminLayout />}>
              <Route path="events" element={<EventList />} />
              <Route path="events/create" element={<EventCreate />} />
              <Route path="events/:eventId" element={<EventDetail />} />
              <Route path="events/:eventId/participants" element={<ParticipantList />} />
              <Route path="members" element={<MemberList />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}