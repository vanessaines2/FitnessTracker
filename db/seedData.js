// Create dummy data to seed into your DB
const users = [
  { username: "Wanda", password: "1234567" },
  { username: "Jessica", password: "1234567" },
  { username: "Vanessa", password: "1234567" },
  { username: "Malachi", password: "12345" },
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
