const express = require("express");
const { authRequired } = require("./utils");
const routinesRouter = require("express").Router();
const {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/adapters/routines");

// localhost:3001/api/routines/routines
routinesRouter.get("/routines", async (req, res, next) => {
  try {
    const publicRoutines = await getAllPublicRoutines();
    res.send({
      status: 200,
      status_message: "got all public routines",
      data: publicRoutines,
    });
  } catch (error) {
    next(error);
  }
});

//localhost:3001/api/routines/
routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { creatorId, isPublic, name, goal } = req.body;
    const newRoutine = await createRoutine(creatorId, isPublic, name, goal);
    res.send({
      status: 200,
      status_message: "created routine",
      data: newRoutine,
    });
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const { isPublic, name, goal } = req.body;
    const updatedRoutine = await updateRoutine(routineId, isPublic, name, goal);

    if (!updatedRoutine) {
      next({
        name: "RoutineNotFound",
        message: "A routine with that id does not exist",
      });
      return;
    }
    res.send({ message: "Routine Update", data: updatedRoutine });
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:routineId", async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const routine = await destroyRoutine(routineId);
    if (!routine) throw error;
    res.send({
      status: 200,
      status_message: "deleted routine",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
