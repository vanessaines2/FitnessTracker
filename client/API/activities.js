export async function fetchAllActivities() {
  try {
    const response = await fetch("/api/activities");
    const result = await response.json();
    console.log("result data: ", result.data, "Just result : ", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
