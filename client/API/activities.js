import { useState, useEffect } from "react";

export function AllActivities() {
  const [activities, setActivities] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getAllActivities() {
      try {
        console.log("trying to fetch data");
        const response = await fetch("/api/activities/");
        const result = await response.json();
        console.log("result:", result);
        setActivities(result);
      } catch (error) {
        setError(error);
      }
    }
    getAllActivities();
  }, []);
  return (
    <div>
      <p> helloooooo {activities} </p>
    </div>
  );
}
