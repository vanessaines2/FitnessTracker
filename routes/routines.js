const express = require("express");
const router = express.Router();
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

router.get("/", async (req, res, next) => {
  const publicRoutines = await getAllPublicRoutines();
  res.send({
    status: 200,
    status_message: "got all public routines",
    data: publicRoutines,
  });
});

router.post("/", async (req, res, next) => {
  const { creatorId, isPublic, name, goal } = req.body;
  const newRoutine = await createRoutine(creatorId, isPublic, name, goal);
  res.send({
    status: 200,
    status_message: "created routine",
    data: newRoutine,
  });
});

router.delete("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  const routine = await destroyRoutine(routineId);
  if (!routine) throw error;
  res.send({
    status: 200,
    status_message: "deleted routine",
    data: null,
  });
});

module.exports = router;
