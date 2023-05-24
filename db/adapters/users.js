const client = require("../client");


async function createUser({username, password}){
    const { 
        rows: [user],
    } = await client.query(
        
        "INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        "
        [username, password]
    )
    return user;
}

async function getAllUsers(){
    const { rows} await client.query('
    SELECT * FROM users;
    ');
    return rows;
}


async function getUser() {}

async function getUserById() {}

async function getUserByUsername() {}

module.exports = {createUser, getAllUsers };