import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "./components/auth/AllActivities";
import { AllRoutines } from "./components/auth/AllRoutines";
import { RegisterForm } from "./components/auth/Register";
import { Profile } from "./components/auth/Profile";
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Fitness App ! </h1>
        <Link to="/activities">Activities</Link>
        <Link to="/routines"> Routines </Link>

        {/* have an authorized view vs unauthorized */}
      </header>

      <Routes>
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/routines" element={<AllRoutines />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<RegisterForm />}></Route>
        <Route path="/" element={<RegisterForm />}></Route>
        <Route path="/me" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
