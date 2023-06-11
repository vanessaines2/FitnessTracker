// Create dummy data to seed into your DB
const users = [
  { username: "Wanda", password: "12345678" },
  { username: "Jessica", password: "12345678" },
  { username: "Vanessa", password: "12345678" },
  { username: "Malachi", password: "12345678" },
];

const activities = [
  { name: "squats", description: "Legs" },
  { name: "push ups", description: "Chest" },
  { name: "bicep curl", description: "Arms" },
  { name: "walking", description: "Cardio" },
];
const routines = [
  {
    is_public: true,
    name: "tuesday training",
    goal: "get fit",
  },
  {
    is_public: false,
    name: "wednesday workout",
    goal: "get fit",
  },
];
const routine_activities = [
  {
    duration: "45",
    count: "25",
  },
];

module.exports = { users, activities, routines, routine_activities };
