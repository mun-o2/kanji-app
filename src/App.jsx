import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import mock from "./mockData";

import { AppContext } from "./AppContext";
import Nav from "./components/nav";


import Top from "./pages/Top";
import OrganizerLogin from "./pages/auth/OrganizerLogin";
import OrganizerRegister from "./pages/auth/OrganizerRegister";
import CircleHome from "./pages/CircleHome";
import EventCreate from "./pages/event/EventCreate";
import RSVP from "./pages/event/RSVP";
import PinSetup from "./pages/PinSetup";
import Complete from "./pages/event/Complete";
import DayLogin from "./pages/DayLogin";
import DayPage from "./pages/DayPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SeatingSetting from "./pages/SeatingSetting";
import SeatingResult from "./pages/SeatingResult";
import GroupHome from "./pages/group/GroupHome";
import EventList from "./pages/group/EventList";
import MemberList from "./pages/MemberList";
import GroupSetting from "./pages/group/GroupSetting";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import ParticipantList from "./pages/ParticipantList";
import SeatPage from "./pages/SeatPage";
import ReceptionPage from "./pages/ReceptionPage";
import AdminSettings from "./pages/admin/AdminSettings";

export default function App() {
  const [events, setEvents] = useState(mock.events);

  return (
    <AppContext.Provider value={{ events, setEvents }}>
      <div className="app-root">
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Top />} />
            <Route path="/login" element={<OrganizerLogin />} />
            <Route path="/register" element={<OrganizerRegister />} />
            <Route path="/circle" element={<CircleHome />} />
            <Route path="/event/create" element={<EventCreate />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/pin" element={<PinSetup />} />
            <Route path="/complete" element={<Complete />} />
            <Route path="/day/login" element={<DayLogin />} />
            <Route path="/day" element={<DayPage />} />

            {/* 管理者ダッシュボード関連のルーティング */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="participants" element={<ParticipantList />} />
              <Route path="events" element={<EventList />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="/seating-setting" element={<SeatingSetting />} />
            <Route path="/seating-result" element={<SeatingResult />} />
            <Route path="/group/home" element={<GroupHome />} />
            <Route path="/group/events" element={<EventList />} />
            <Route path="/group/members" element={<MemberList />} />
            <Route path="/group/settings" element={<GroupSetting />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}
