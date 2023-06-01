export async function fetchAllActivities() {
  try {
    const response = await fetch("/api/activities");
    const result = await response.json();
    console.log("result: ", result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
