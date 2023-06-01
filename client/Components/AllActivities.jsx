import { useState, useEffect } from "react";
import { fetchAllActivities } from "../API/activities";

export function AllActivities() {
  const [activities, setActivities] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getActivities() {
      const activitiesList = await fetchAllActivities();
      setActivities(activitiesList);
    }
    getActivities();
  }, []);

  return <div></div>;
}
