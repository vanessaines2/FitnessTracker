const client = require("../client");

async function createRoutine({ creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `INSERT INTO routines(creator_id, is_public, name, goal)
      VALUES($1,$2,$3,$4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
      `,
      [creator_id, is_public, name, goal]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM routines
      INNER JOIN activities
      ON routines.id = activities.id
      `
    );
  } catch (error) {
    console.log(error);
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    `,
      [id]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
}
async function getAllPublicRoutines() {
  try {
    const {
      rows: [routine],
    } = await client.query(`
    SELECT * 
    FROM routines 
    JOIN activities
    ON routines.id = activities.id
    WHERE is_public = true 
    `);
  } catch (error) {
    console.log(error);
  }
}

async function getAllRoutinesByUser(userId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
      SELECT * 
      FROM routines
      WHERE "creator_id" =${userId}
      `
    );
  } catch (error) {
    console.log(error);
  }
}

async function getRoutinesWithoutActivities() {
  try {
  } catch (error) {
    console.log(error);
  }
}

async function getPublicRoutinesByUser() {}
async function getPublicRoutinesByActivity() {}

async function updateRoutine() {}
async function destroyRoutine() {}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getAllPublicRoutines,
  getAllRoutinesByUser,
};
