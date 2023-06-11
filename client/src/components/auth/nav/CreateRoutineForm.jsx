import { useState, useEffect } from "react";
import { createRoutine } from "../../../api/routines";

export default function CreateRoutine() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [myCreatedRoutines, setMyCreatedRoutines] = useState("");

  //   useEffect(() => {
  //     async function createMyRoutine(name, goal, creatorId, isPublic) {
  //       const response = await createRoutine(name, goal, creatorId, isPublic);
  //       setMyCreatedRoutines(response);
  //     }
  //     createMyRoutine();
  //   }, []);

  return (
    <div className="routineForm">
      <h1>Create Routine</h1>
      <form
        className="routineForm"
        onSubmit={async (e) => {
          e.preventDefault();
          await createRoutine(isPublic, name, goal);
          console.log("this is the created routine", createRoutine);
        }}
      >
        <label>enter routine name</label>
        <input
          type="text"
          value={name}
          placeholder="enter routine name"
          onChange={(e) => {
            e.preventDefault;

            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={goal}
          placeholder="enter routine goal"
          onChange={(e) => {
            e.preventDefault;

            setGoal(e.target.value);
          }}
        />
        <input
          type="text"
          value={isPublic}
          placeholder="is it public"
          onChange={(e) => {
            e.preventDefault;

            setIsPublic(e.target.value);
          }}
        />
        <button>Submit </button>
      </form>
    </div>
  );
}
