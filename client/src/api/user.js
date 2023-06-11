export async function getUserRoutines(username) {
  try {
    const resp = await fetch(`/api/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await resp.json();
    console.log("result from get user api:", result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
