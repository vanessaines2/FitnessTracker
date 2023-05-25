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
  getRoutineActivityByRoutine,
  destroyRoutineActivity,
} = require("./adapters/routine_activites");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
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
  } catch (error) {
    throw error;
  }
}

async function populateTables() {
  // Seed tables with dummy data from seedData.js

  try {
    await client.query(
      `
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    `,
      users
    );

    await client.query(
      `
    INSERT INTO routines(creator_id, is_public, name, goal)
    VALUES ($1,$2,$3,$4)
    `,
      routines
    );

    await client.query(
      `INSERT INTO routine_activities(routine_id, activity_id, count, duration)
       VALUES ($1,$2,$3,$4)
       `,
      routine_activities
    );

    await client.query(
      `INSERT INTO activities(name, description)
        VALUES ($1,$2)
        `,
      activities
    );
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
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
