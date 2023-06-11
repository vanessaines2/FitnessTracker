import { useState, useEffect } from "react";
import { fetchAllActivities } from "../../api/activities";
import useAuth from "../../hooks/auth";
import { CreateActivity } from "./nav/CreateActivity";

export function AllActivities() {
  const [activities, setActivities] = useState("");
  const { user, setLoggedIn } = useAuth();
  // const [error, setError] = useState(null);

  useEffect(() => {
    async function getActivities() {
      const activitiesList = await fetchAllActivities();
      setActivities(activitiesList);
    }
    getActivities();
  }, []);

  return (
    <div className="activitiesPage">
      <h1>All Activities</h1>
      {setLoggedIn === true && <CreateActivity />}
      {activities.length > 0 &&
        activities.map((activity) => {
          return (
            <div className="activities" key={activity.id}>
              <ul className="activitiesList" style={{ listStyle: "none" }}>
                <li> Activity Name: {activity.name}</li>
                <li>Activity Description: {activity.description}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
}
