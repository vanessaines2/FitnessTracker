const client = require("../client");

async function createRoutine(creator_id, is_public, name, goal) {
  try {
    const {
      rows: [row],
    } = await client.query(
      `INSERT INTO routines(creator_id, is_public, name, goal)
      VALUES ($1,$2,$3,$4)
      ON CONFLICT (creator_id, name) DO NOTHING
      RETURNING *;
      `,
      [creator_id, is_public, name, goal]
    );
    console.log("printing row %s", row);
    return row;
  } catch (error) {
    console.log("Error creating routines " + error.stack);
  }
}

async function getAllRoutines() {
  try {
    const { rows } = await client.query(
      `
      SELECT 
        routines.id as id,
        routines.name as name,
        routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count
            
          )
        ) END AS activities
        FROM routines
        FULL OUTER JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities
        ON activities.id = routine_activities.activity_id
        GROUP BY routines.id, routine_activities.routine_id
      `
    );
    return rows;
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
      SELECT 
        routines.id as id,
        routines.name as name,
        routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count
            
          )
        ) END AS activities
        FROM routines
        JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        JOIN activities
        ON activities.id = routine_activities.activity_id
        WHERE routines.id = $1
        GROUP BY routines.id, routine_activities.routine_id
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
    const { rows } = await client.query(`
    SELECT 
      routines.id as id,
      routines.name as name,
      routines.goal as goal,
      CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'duration', routine_activities.duration,
          'count', routine_activities.count
          
        )
      ) END AS activities
      FROM routines
      FULL OUTER JOIN routine_activities 
      ON routines.id = routine_activities.routine_id
      FULL OUTER JOIN activities
      ON activities.id = routine_activities.activity_id
      WHERE routines.is_public = true
      GROUP BY routines.id, routine_activities.routine_id
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
async function getPublicRoutinesByUser(username) {
  try {
    const { rows } = client.query(
      `
      SELECT 
        routines.id as id,
        routines.name as name,
        routines.goal as goal,
        CASE WHEN routine_activities.routine_id IS NULL THEN '[]'::json
        ELSE
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', activities.id,
            'name', activities.name,
            'description', activities.description,
            'duration', routine_activities.duration,
            'count', routine_activities.count
            
          )
        ) END AS activities
        FROM routines
        JOIN users 
        ON routines.creator_id = users.id
        FULL OUTER JOIN routine_activities 
        ON routines.id = routine_activities.routine_id
        FULL OUTER JOIN activities
        ON activities.id = routine_activities.activity_id
        WHERE users.username = $1 AND routines.is_public = true
        GROUP BY routines.id, routine_activities.routine_id
      `,
      [username]
    );
    return rows;
  } catch (error) {
    console.error(error);
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
      WHERE creator_id =${userId};
      `,
      [userId]
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

async function getPublicRoutinesByActivity() {
  try {
  } catch (error) {
    console.log(error);
  }
}

async function updateRoutine() {
  try {
  } catch (error) {
    throw error;
  }
}
async function destroyRoutine() {
  try {
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getAllRoutines,
  getRoutineById,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getRoutinesWithoutActivities,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
};
