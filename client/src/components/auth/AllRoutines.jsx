import { useState, useEffect } from "react";
import { fetchAllRoutines } from "../../../api/routines";

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
          console.log("Routine Activities: ", routine.activities);
          return (
            <div className="routines" key={routine.id}>
              <h3>Routine Name :{routine.name}</h3>
              <h4>Routine Goal: {routine.goal} </h4>

              {routine.activities.map((ra) => {
                return (
                  <ul key={ra.id} style={{ listStyle: "none" }}>
                    {" "}
                    Activity <li>name : {ra.name} , </li>
                    <li>description: {ra.description} ,</li>
                    <li>duration: {ra.duration} minutes ,</li>
                    <li>count: {ra.count} </li>
                  </ul>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
