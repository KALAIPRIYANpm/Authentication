import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './loginpage';
import SignupPage from './signUp';
import Admin from "./admin-dashboard";
import User from "./user-dashboard";
import CreateEvent from "./createEvent";
import Registrations from "./registrations";
import OngoingEvents from "./ongoing";
import BookingForm from "./bookingForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/create-event" element={<CreateEvent/>}/>
        <Route path="/registrations" element={<Registrations/>}/>
        <Route path="/ongoing-events" element={<OngoingEvents/>}/>
        <Route path="/booking/:eventId" element={<BookingForm/>} />

      </Routes>
    </Router>
  );
};

export default App;
