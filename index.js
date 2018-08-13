const express = require("express");
const app = express();
const server = require("http").Server(app);
const morgan = require("morgan");
const collectionsAPI = require("./api/collections");
require("dotenv").config();

// Logging
app.use(morgan("combined"));

// Set configuration variables
const { PORT } = process.env;
const port = PORT || 5002;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const home = express();

home.get("/", (req, res) => res.json({ message: "cool" }));

app.use("/api", home);
app.use("/api/collect", collectionsAPI);

exports.server = server.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
