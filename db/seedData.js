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
const routines = [
  {
    creator_id: 1,
    is_public: true,
    name: "Jessica",
    goal: "get fit",
  },
];
const routine_activities = [
  {
    routine_id: 1,
    activity_id: 1,
    duration: "100",
    count: "10",
  },
];

module.exports = { users, activities, routines, routine_activities };
