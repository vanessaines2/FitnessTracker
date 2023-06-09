import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "../src/Components/AllActivities";
import { AllRoutines } from "../src/Components/AllRoutines";
import { RegisterForm } from "../src/Components/Register";
import { Profile } from "../src/Components/Profile";
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
