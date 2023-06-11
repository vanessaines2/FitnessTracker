export async function fetchAllRoutines() {
  try {
    const response = await fetch("/api/routines/routines");
    const result = await response.json();
    console.log("result data: ", result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
export async function createRoutine(name, goal, creatorId, isPublic) {
  try {
    const resp = await fetch(`/api/routines`, {
      method: "POST",
      body: JSON.stringify({
        name,
        goal,
        creatorId,
        isPublic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}
