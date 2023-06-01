import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "../Components/AllActivities";
import { AllRoutines } from "../Components/AllRoutines";
function App() {
  return (
    <>
      <Routes>
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/routines" element={<AllRoutines />} />
      </Routes>
    </>
  );
}

export default App;
