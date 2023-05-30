const client = require("./client");
const { createUser } = require("./adapters/users");
const { createActivity } = require("./adapters/activities");
const { createRoutine } = require("./adapters/routines");
const { addActivityToRoutine } = require("./adapters/routine_activities");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData");

async function dropTables() {
  try {
    console.log("...starting to drop tables...");
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
            name VARCHAR(255) NOT NULL,
            goal TEXT NOT NULL,
            UNIQUE(creator_id, name)
          );
          CREATE TABLE activities (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) UNIQUE NOT NULL,
            description TEXT NOT NULL
          );
          CREATE TABLE routine_activities (
            id SERIAL PRIMARY KEY,
            routine_id INTEGER REFERENCES routines (id),
            activity_id INTEGER REFERENCES activities (id),
            duration INTEGER,
            count INTEGER,
            UNIQUE(routine_id, activity_id)
          );
          `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error creating table");
    throw error;
  }
}

async function populateTables() {
  console.log("..starting to populate...");
  try {
    const activityIDs = [];

    for (const activity of activities) {
      const createdActivity = await createActivity(
        activity.name,
        activity.description
      );
      console.log("Activity:", createdActivity);

      activityIDs.push(createdActivity.id);
    }

    const userIDs = [];

    for (const user of users) {
      console.log("user: " + user.username + " password: " + user.password);
      const createdUser = await createUser(user.username, user.password);

      userIDs.push(createdUser.id);
    }

    // Create Routine Activities for each user
    for (const userId of userIDs) {
      // user Routine
      const userRoutineIDs = [];

      for (const routine of routines) {
        const createdRoutine = await createRoutine(
          userId,
          routine.is_public,
          routine.name,
          routine.goal
        );
        console.log(createdRoutine);

        userRoutineIDs.push(createdRoutine.id);
      }

      console.log(userRoutineIDs);

      for (const routine_activity of routine_activities) {
        const activityID =
          activityIDs[Math.floor(Math.random() * activityIDs.length)];

        const userRoutineID =
          userRoutineIDs[Math.floor(Math.random() * userRoutineIDs.length)];
        const createdRoutineActivity = await addActivityToRoutine(
          userRoutineID,
          activityID,
          routine_activity.count,
          routine_activity.duration
        );
      }
    }
    console.log("YO");
  } catch (error) {
    console.error("Population Trouble!!!" + error.stack);
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
