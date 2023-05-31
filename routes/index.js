const router = require("express").Router();

// GET to check "/api/health"
router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/activities", require("./activities"));
// router.use("index", require("./index"));
router.use("/routineActivities", require("./routine_activities"));
router.use("/routines", require("./routines"));

module.exports = router;
