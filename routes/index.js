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

module.exports = router;
