const client = require("../client");

async function createUser({ username, password }) {
  const {
    rows: [user],
  } = await client.query(
    `INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
    [username, password]
  );
}
return user;

// may need to revise this function
async function getUsers({ username, password }) {
  const { rows } = await client.query(`
    SELECT * FROM users;
    `);
  return user;
}

async function getUserById(id) {
  const {
    rows: [user],
  } = await client.query(`
  SELECT id, username 
  FROM users
  WHERE id=${id};`);
  return user;
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * 
    FROM users
    WHERE username=$1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, getUsers, getUserById, getUserByUsername };
