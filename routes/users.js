const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
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

usersRouter.get("/", async (req, res, next) => {
  try {
    const user = await getUser();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// router.get("/:username/routines", async (req, res, next) => {
//   try {
//     const { username } = req.params;

//     const user = await getUserByUsername(username);
//     if (user === []) throw error;

//     const routines = await getAllPublicRoutinesByUser(username);
//     res.send({
//       status: 200,
//       status_message: "Successfully got users routines",
//       data: routines,
//     });
//   } catch (error) {
//     next({
//       status: 404,
//       status_message: "Account with supplied username does not exist",
//       data: null,
//     });
//   }
// });

module.exports = usersRouter;
