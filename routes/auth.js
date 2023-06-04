const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const { createUser, getUserByUsername } = require("../db/adapters/users");
// const { JWT_SECRET } = process.env;

// POST /api/auth/signup
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
    console.log("hashed password:", hashedPassword);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);
    console.log("token:", token);

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

authRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    const checkedpassword = await bcrypt.compare(password, user.password);
    if (checkedpassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send({ message: "You're logged in!!" });
    }
  } catch (error) {
    next({
      name: "Invalid login",
      message: "Wrong username or password provided",
    });
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
      loggedIn: false,
      message: "You've logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authRequired, (req, res, next) => {
  res.send(req.user);
});

module.exports = authRouter;
