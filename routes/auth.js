const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const { createUser, getUserByUsername } = require("../db/adapters/users");

const { JWT_SECRET } = process.env;

// POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        status: 400,
        message: "User already exists!",
        name: "Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
      res.status(401);
      next({
        message: "We Cannot locate that user",
        name: "Auth Error",
      });
      return;
    }

    const checkedpassword = await bcrypt.compare(password, user.password);
    if (!checkedpassword) {
      res.status(401);
      next({
        message: "Incorrect Password",
        name: "Unauthenticated",
      });
      return;
    }
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "Time to get fit with Van/Wan!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Goodbye, see you next time",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authRequired, (req, res, next) => {
  res.send({ success: true, message: "you are authorized", user: req.user });
});
module.exports = authRouter;
