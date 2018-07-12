const express = require("express");
const app = express();
const collectionsAPI = require("./api/collections");

// Set configuration variables
const { PORT} = process.env;
const port = PORT || 5002;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use()