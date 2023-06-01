import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "../Components/AllActivities";

function App() {
  return (
    <>
      <Routes>
        <Route path="/activities" element={<AllActivities />} />
      </Routes>
    </>
  );
}

export default App;
