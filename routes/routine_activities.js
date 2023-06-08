const express = require("express");
const routineActivitiesRouter = require("express").Router();
const { authRequired } = require("./utils");

const {
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

routineActivitiesRouter.post("/", authRequired, async (req, res, next) => {
  try {
    const { routineId, activityId, count, duration } = req.body;
    const alreadyExists = await getRoutineActivitiesByRoutine(routineId);
    if (
      alreadyExists &&
      (await alreadyExists.find((value) => value.activity_id === activityId))
    ) {
      next({
        name: "already exists",
        message: "That routine already exists",
      });
      return;
    }
    const addActivity = await addActivityToRoutine(
      routineId,
      activityId,
      count,
      duration
    );
    res.send({ name: "added activity to routine", data: addActivity });
  } catch (error) {
    next({
      name: "not found",
      message: "No current routine with that ID",
    });
  }
});

//localhost:3001/api/routineActivities/
routineActivitiesRouter.patch(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const { count, duration } = req.body;
      const updatedRoutineActivity = await updateRoutineActivity(
        routineActivityId,
        count,
        duration
      );
      if (!updatedRoutineActivity) {
        next({
          name: "RoutineActivityNotFound",
          message: "A routine activity with that id does not exist",
        });
        return;
      }
      res.send({
        // note that 200 - is an ok status
        status: 200,
        status_message: "updated your routine activity",
        data: updatedRoutineActivity,
      });
    } catch (error) {
      next(error);
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  authRequired,
  async (req, res, next) => {
    try {
      const { routineActivityId } = req.params;
      const routineActivity = await destroyRoutineActivity(routineActivityId);
      if (!routineActivity) {
        next({
          name: "RoutineActivityNotFound",
          message: "A routine activity with that id does not exist",
        });
        return;
      }

      res.send({
        status: 200,
        status_message: "successfully deleted the routine",
        data: routineActivity,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
