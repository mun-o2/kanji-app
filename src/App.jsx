import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import mock from "./mockData";

import { AppContext } from "./AppContext";
import Nav from "./components/nav";


import Top from "./pages/Top";
import OrganizerLogin from "./pages/OrganizerLogin";
import OrganizerRegister from "./pages/OrganizerRegister";
import CircleHome from "./pages/CircleHome";
import EventCreate from "./pages/EventCreate";
import RSVP from "./pages/RSVP";
import PinSetup from "./pages/PinSetup";
import Complete from "./pages/Complete";
import DayLogin from "./pages/DayLogin";
import DayPage from "./pages/DayPage";
import AdminDashboard from "./pages/AdminDashboard";
import SeatingSetting from "./pages/SeatingSetting";
import SeatingResult from "./pages/SeatingResult";

export default function App() {
  const [events, setEvents] = useState(mock.events);

  return (
    <AppContext.Provider value={{ events, setEvents }}>
      <div className="app-root">
        <BrowserRouter>
          <Nav />
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
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/seating-setting" element={<SeatingSetting />} />
            <Route path="/seating-result" element={<SeatingResult />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}
