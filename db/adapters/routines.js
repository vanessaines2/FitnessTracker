const client = require("../client");

async function getRoutineById(id) {
  try {
    const {
      rows: [],
    } = await client.query(`
   
    `);
  } catch (error) {
    console.log(error);
  }
}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {}
async function getAllPublicRoutines() {}
async function getAllRoutinesByUser() {}
async function getPublicRoutinesByUser() {}
async function getPublicRoutinesByActivity() {}
async function createRoutine() {}
async function updateRoutine() {}
async function destroyRoutine() {}

module.export = { getRoutineById };
