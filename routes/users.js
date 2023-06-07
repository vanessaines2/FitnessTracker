const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const {
  createUser,
  getUserByUsername,
  getUser,
} = require("../db/adapters/users");

// POST /users/register
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUsername(username);
    if (username.length === 0) {
      next({
        message: "You must enter a username!",
        name: "Username Error",
      });
      return;
    }
    if (_user.username !== username) {
      next({
        message: "Incorrect Username!",
        name: "Username Error",
      });
      return;
    }
    const match = await bcrypt.compare(password, _user.password);
    const token = jwt.sign(_user, process.env.JWT_SECRET);
    if (match === true) {
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send(_user);
    }
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
