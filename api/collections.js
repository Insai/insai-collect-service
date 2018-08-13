const express = require("express");
const pocketAuth = require("../utils/pocket-auth");
const pocketData = require("../utils/pocket-data");

/**
 * Collections API
 */

const collections = express.Router();

collections.get("/list/:accessToken", (req, res) => {
  const accessToken = req.params.accessToken;
  pocketData
    .getData(accessToken)
    .then(data => {
      // sync pocket list with mongodb
      // const keys = Object.keys(data.list);
      // const items = keys.map(key => data.list[key]);
      // db.syncPocketList(items);

      return res.json(data);
    })
    .catch(err => res.json(err));
});

collections.post("/list", (req, res) => {
  const { title, url, accessToken } = req.body;
  pocketData
    .saveItem(accessToken, title, url)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * Pocket Authentication
 */

collections.get("/request_token", (req, res) => {
  pocketAuth
    .requestToken()
    .then(token => res.json({ token }))
    .catch(err => res.json(err));
});

collections.get("/access_token/:requestToken", (req, res) => {
  const requestToken = req.params.requestToken;
  pocketAuth
    .convertToken(requestToken)
    .then(token => res.json({ token }))
    .catch(err => res.json({ err }));
});

module.exports = collections;
