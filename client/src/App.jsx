import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "../Components/AllActivities";
import { AllRoutines } from "../Components/AllRoutines";
import { RegisterForm } from "../Components/Register";
function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Fitness App ! </h1>

        {/* have an authorized view vs unauthorized */}
      </header>
      <Routes>
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/routines" element={<AllRoutines />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
