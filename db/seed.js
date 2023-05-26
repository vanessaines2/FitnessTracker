const client = require("./client");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");

const {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
} = require("./adapters/activities");
const {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  getRoutineActivitiesByRoutine,
  destroyRoutineActivity,
} = require("./adapters/routine_activities");

const {
  users,
  activities,
  creator_id,
  is_public,
  goal,
  name,
  description,
  routines,
  routine_activities,
} = require("./seedData");
const { createRoutine } = require("./adapters/routines");

async function dropTables() {
  console.log("Starting to drop tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  console.log("...starting to build tables...");
  try {
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar (255) NOT NULL
          );
          CREATE TABLE routines (
            id SERIAL PRIMARY KEY,
            creator_id INTEGER REFERENCES users(id),
            is_public BOOLEAN DEFAULT false,
            name VARCHAR(255) UNIQUE NOT NULL,
            goal TEXT NOT NULL
          );
          CREATE TABLE activities (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) UNIQUE NOT NULL,
            description TEXT NOT NULL
          );
          CREATE TABLE routine_activities (
            id SERIAL PRIMARY KEY,
            routine_id INTEGER UNIQUE REFERENCES routines (id),
            activity_id INTEGER UNIQUE REFERENCES activities (id),
            duration INTEGER,
            count INTEGER
          );
          `);
    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

async function populateTables() {
  try {
    console.log("..starting to populate tables..");
    for (const user of users) {
      await createUser(user);
    }
    console.log("..users tables populated!");
    console.log("starting to populate activities");
    // // await client.query(
    // //   `INSERT INTO activities (name, description)
    // //    VALUES ($1,$2)
    // //    `,
    // //   [name, description]
    // // );

    // for (const activity of activities) {
    //   await createActivity(name, description);
    // }
    // for (const routine of routines) {
    //   await createRoutine(creator_id, is_public, name, goal);
    // }

    console.log("Activity created!");
  } catch (error) {
    console.log(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    console.log("..starting to drop tables..");
    await dropTables();
    console.log("Finished dropping tables!");
    console.log("..starting to build tables..");
    await createTables();
    console.log("Tables Created!");
    console.log("..starting to populate tables..");
    await populateTables();
    console.log("Tables Populated!");
  } catch (error) {
    console.log("NO luck with the DBrebuild");
  } finally {
    client.end();
  }
}

rebuildDb();
