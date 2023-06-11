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
export async function createRoutine(is_public, name, goal) {
  try {
    const resp = await fetch("/api/routines/", {
      method: "POST",
      body: JSON.stringify({
        is_public,
        name,
        goal,
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
