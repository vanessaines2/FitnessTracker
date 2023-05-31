const routineActivitiesRouter = require("express").Router();

const {
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db/adapters/routine_activities");

//localhost:3001/api/routineActivities/
routineActivitiesRouter.patch("/:routineActivityId", async (req, res, next) => {
  try {
    const routineActivity = await updateRoutineActivity(
      routineActivityId,
      count,
      duration
    );
    res.send({
      // 200 - is an ok status
      status: 200,
      status_message: "updated routine activity",
      data: updateRoutineActivity,
    });
  } catch (error) {
    next(error);
  }
});

routineActivitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    try {
      const routineActivity = await destroyRoutineActivity(routineActivityId);
      res.send({
        status: 200,
        status_message: "successfully destroyed routine",
        data: routineActivity,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
