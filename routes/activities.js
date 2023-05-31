const express = require("express");
const activitiesRouter = require("express").Router();
const {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");

//localhost:3001/api/activities/activities
activitiesRouter.post("/activities", async (req, res, next) => {
  try {
    const newActivity = await createActivity(name, description);
    res.send({
      status: 200,
      status_message: "created activity",
      data: newActivity,
    });
  } catch (error) {
    next(error);
  }
});

// localhost:3001/api/activities/
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities(activityId);
    res.send({
      status: 200,
      status_message: "got all activities",
      data: allActivities,
    });
  } catch (error) {
    next(error);
  }
});
// localhost:3001/api/activities/:activityId

activitiesRouter.patch("/:activityId", async (req, res, next) => {
  try {
    const updatedActivity = await updateActivity(activityId, name, description);
    res.send({
      status: 200,
      status_message: "updated activity",
      data: updatedActivity,
    });
  } catch (error) {
    next(error);
  }
});

//localhost:3001/api/activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  try {
    const publicRoutines = await getPublicRoutinesByActivity();
    res.send({
      status: 200,
      status_message: "get public routines with activity",
      data: publicRoutines,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
