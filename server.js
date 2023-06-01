require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = 3001;
const server = express();

const client = require("./db/client");
client.connect();

// Middleware
server.use(morgan("dev"));
server.use(express.json());

server.use(express.static(path.join(__dirname, "./client", "dist")));

// Routes
server.use("/api", require("./routes"));

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
