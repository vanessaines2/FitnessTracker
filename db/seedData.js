// Create dummy data to seed into your DB
const users = [
  { username: "Wanda", password: 12345678 },
  { username: "Jessica", password: 1234567 },
  { username: "Vanessa", password: 123567 },
];
const activities = [
  { name: "squats", description: "Legs" },
  { name: "push ups", description: "Chest" },
  { name: "bicep curl", description: "Arms" },
  { name: "walking", description: "Cardio" },
];
const routines = [];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };
