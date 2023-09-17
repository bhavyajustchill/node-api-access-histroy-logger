const express = require("express");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const cors = require("cors");

const portNo = 8081;

const app = express();

// write stream
const logStream = fs.createWriteStream(path.join(__dirname, "access_history.log"), { flags: "a" });

app.use(express.json());
app.use(cors());

// middleware for logging requests with timestamps
app.use((req, res, next) => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const logMessage = `[${timestamp}] ${req.method} ${req.url}`;

  logStream.write(logMessage + "\n");
  console.log(logMessage);

  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is Live!" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Start the Express server
app.listen(portNo, () => {
  console.log(`Server is Listening on Port ${portNo}`);
});
