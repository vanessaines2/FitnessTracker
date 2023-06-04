const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const {
  createUser,
  getUserByUsername,
  getUser,
} = require("../db/adapters/users");

// POST /users/register
usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "Already A User",
        message: "Registration successful",
      });
    }

    // POST /users/login
    const user = await createUser(username, password);
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2w" });
    res.send({
      message: "The username already exists",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserByUsername(verify.username);

    res.send({ message: "Successfully found user data", data: user });
  } catch (error) {
    next({
      name: "Incorrect credentials",
      message: "Wrong login details",
      data: null,
    });
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getUserByUsername(username);
    if (user === []) throw error;

    const routines = await getAllPublicRoutinesByUser(username);
    res.send({
      status: 200,
      status_message: "Successfully retrieved users routines",
      data: routines,
    });
  } catch (error) {
    next({
      status: 404,
      status_message: "No account with that username",
      data: null,
    });
  }
});

module.exports = usersRouter;
