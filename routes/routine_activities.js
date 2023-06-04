const express = require("express");
const routineActivitiesRouter = require("express").Router();
const { authRequired } = require("./utils");

const {
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

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
