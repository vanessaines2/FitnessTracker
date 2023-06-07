import { useState, useEffect } from "react";
import { fetchAllRoutines } from "../API/routines";

export function AllRoutines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      const routineList = await fetchAllRoutines();
      setRoutines(routineList);
    }
    getRoutines();
  }, []);

  return (
    <div className="routinesPage">
      <h1>All Public Routines:</h1>
      {routines.length > 0 &&
        routines.map((routine) => {
          return (
            <div className="routines" key={routine.id}>
              <h3>Routine Name :{routine.name}</h3>
              <h4>Routine Goal: {routine.goal} </h4>
              <h5>Routine Activities: </h5>
              <h5></h5>
            </div>
          );
        })}
    </div>
  );
}
