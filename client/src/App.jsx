import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "../Components/AllActivities";
import { AllRoutines } from "../Components/AllRoutines";
function App() {
  return (
    <div className="app">
      <header>
        <h1>Fitness App ! </h1>

        {/* have an authorized view vs unauthorized */}
      </header>
      <Routes>
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/routines" element={<AllRoutines />} />
      </Routes>
    </div>
  );
}

export default App;
