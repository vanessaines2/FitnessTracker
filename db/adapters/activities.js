const client = require("../client");
const { activities } = require("../seedData");

async function getActivityById(id) {
  try {
    let { rows } = await client.query(
      `
            SELECT * FROM activities
            WHERE id=$1
            `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    let { rows } = await client.query(
      `SELECT * 
            FROM activities`
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createActivity(name, description) {
  try {
    const newActivity = awaitclient.query(
      `INSERT INTO activities(name, description)
            VALUES ($1, $2)
            ON CONFLICT(name) DO NOTHING`[(name, description)]
    );
    return newActivity.rows;
  } catch (error) {
    throw error;
  }
}

async function updateActivity(activityId, name, description) {
    try {
        const rows [activity] = await client.query(
            `UPDATE activities
            SET "name" =$2, "description" =$3
            WHERE id=$1
            RETURN * ` [activityId, name, description]
        );
        return activity;
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    getActivityById,
    getAllActivities,
    createActivity,
    updateActivity,
  };
