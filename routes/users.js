const usersRouter = require("express").Router();

const { getUserByUsername } = require("../db/adapters/users");

// /api/users/:username/routines
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
