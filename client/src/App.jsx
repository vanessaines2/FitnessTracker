import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { AllActivities } from "./components/auth/AllActivities";
import { AllRoutines } from "./components/auth/AllRoutines";
import { RegisterForm } from "./components/auth/Register";
import { Profile } from "./components/auth/Profile";
import CreateRoutine from "./components/auth/nav/CreateRoutineForm";
import { CreateActivity } from "./components/auth/nav/CreateActivity";
import { MyRoutines } from "./components/auth/MyRoutines";

function App() {
  return (
    <div className="app">
      <h1 className="header"> Van Wan Fitness! </h1>
      {/* <h1 className="header">Come get Fit</h1> */}
      <header className="sidenav">
        <Link to="/">Home</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/routines"> Routines </Link>

        <Link to="/me">Profile </Link>

        {/* have an authorized view vs unauthorized */}
      </header>

      <Routes>
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/routines" element={<AllRoutines />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<RegisterForm />}></Route>
        <Route path="/" element={<RegisterForm />}></Route>
        <Route path="/me" element={<Profile />}></Route>
        <Route path="/createroutine" element={<CreateRoutine />}></Route>
        <Route path="/createActivity" element={<CreateActivity />}></Route>
        <Route path="/myroutines" element={<MyRoutines />} />
      </Routes>
    </div>
  );
}

export default App;
