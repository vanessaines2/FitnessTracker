const usersRouter = require("express").Router();

usersRouter.get("/", (req, res, next) => {
  res.send("USERS TO LOAD!");
});

module.exports = usersRouter;
