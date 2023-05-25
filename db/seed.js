const { createUser } = require("./adapters/users");
const client = require("./client");
const { createUser } = require("./adapters/users");
const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  console.log("Starting to drop tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS routine_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
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
    console.error("Error building tables!");
    throw error;
  }
}


async function populateTables() {

//   console.log("populating with data");
//   try {
//     const user = await createUser({ username: "Burger", password: King });
//   } catch (error) {
//     console.log("Didnt work");

  // Seed tables with dummy data from seedData.js

  try {
    console.log("..starting to populate tables..");
    for (const user of users) {
      await createUser(user);
    }
    console.log("..users tables populated!");
  } catch (error) {
    console.log(error);

  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.log("NO luck with the DBrebuild");
  } finally {
    client.end();
  }
}

rebuildDb();
