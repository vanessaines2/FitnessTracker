export async function fetchAllRoutines() {
  try {
    const response = await fetch("/api/routines/routines");
    const result = await response.json();
    console.log("result data: ", result.data, "Just result : ", result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
