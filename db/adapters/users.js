const client = require("../client");

async function createUser(username, password) {
  console.log("Here user: " + username + " password: " + password);

  const {
    rows: [user],
  } = await client.query(
    `
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
     `,
    [username, password]
  );
  return user;
}

async function getUser(username, password) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE username=$1
    `,
      [username]
    );

    // const res = bcrypt.compareSync(password, user.password);

    if (res) {
      return user;
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
  SELECT *
  FROM users
  WHERE id=$1;
  `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
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

module.exports = { createUser, getUser, getUserById, getUserByUsername };
