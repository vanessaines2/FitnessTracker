const express = require("express");
const { authRequired } = require("./utils");
const routinesRouter = require("express").Router();
const {
  getAllPublicRoutines,
  getRoutineById,
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

routinesRouter.get("/:routineId", async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.id);
    console.log("Routine in GET", routine);
    res.send(routine);
  } catch (error) {
    next(error);
  }
});

//localhost:3001/api/routines/
routinesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { creatorId, isPublic, name, goal } = req.body;
    const newRoutine = await createRoutine(name, goal, creatorId, isPublic);
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
    if (!routine) {
      next({
        name: "RoutineNotFound",
        message: "A routine with that id does not exist",
      });
      return;
    }
    res.send({
      message: "deleted routine",
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
