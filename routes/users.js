const usersRouter = require("express").Router();
const { getUsers } = require("../db/adapters/users");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
