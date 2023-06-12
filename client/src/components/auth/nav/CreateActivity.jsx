import { useState } from "react";
import { createActivity } from "../../../api/activities";

export function CreateActivity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");

  async function handleClick() {
    try {
      if (!name || !description)
        return setErrorText("Missing the required fields");
      const newActivity = await createActivity(name, description);

      setErrorText(newActivity.message);
      setNewActivity(newActivity);
    } catch (error) {
      setErrorText(error.message);
      console.error(error);
    }
  }

  return (
    <div className="activity-form">
      <h3>Create a new activity</h3>
      <input
        type="text"
        placeholder="Activity name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Activity description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleClick}>Create</button>
      <p>{errorText}</p>
    </div>
  );
}
