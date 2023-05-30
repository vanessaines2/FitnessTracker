const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const { createUser } = require("../db/adapters/users");

authRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
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
      loggedIn: false,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
