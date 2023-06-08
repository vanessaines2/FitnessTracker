require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = 3001;
const server = express();
const { authRequired } = require("./routes/utils");

const client = require("./db/client.js");
client.connect();

// Middleware
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
server.use("/api", require("./routes"));

server.get("/test", authRequired, (req, res, next) => {
  res.send("You are authorized!");
});

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

// Error Handler
server.use((err, req, res, next) => {
  res.send({
    message: err.message,
    name: err.name,
    stack: err.stack,
  });
});

// Server App

server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
