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
activitiesRouter.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;
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

// GET /api/activities/
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const allActivities = await getAllActivities();
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
    const { activityId } = req.params;
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
  console.log("In the route");
  try {
    const { activityId } = req.params;
    const publicRoutines = await getPublicRoutinesByActivity(activityId);
    console.log("Public routines??", publicRoutines);
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
