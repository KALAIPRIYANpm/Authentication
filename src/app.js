import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './loginpage';
import SignupPage from './signUp';
import Admin from "./admin-dashboard";
import User from "./user-dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </Router>
  );
};

export default App;
