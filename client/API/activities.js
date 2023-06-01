import { useState, useEffect } from "react";
import { getAllActivities } from "../../db/adapters/activities";

export function AllActivities() {
  const [activities, setActivities] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllActivities() {
      try {
        const response = await fetch("/api/activities/");
        const result = await response.json();
        setActivities(result);
      } catch (error) {
        setError(error);
      }
    }
    getAllActivities();
  }, []);

  return (
    <div>
      <p> helloooooo {getAllActivities} </p>
    </div>
  );
}
