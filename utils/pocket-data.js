const fetch = require("node-fetch");
require("dotenv").config();

const { CONSUMER_KEY } = process.env;
// Retrieve a user's pocket data
exports.getData = accessToken => {
  const data = {
    consumer_key: CONSUMER_KEY,
    access_token: accessToken,
    count: 10,
    detailType: "complete"
  };
  return fetch("https://getpocket.com/v3/get", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-accept": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};

// Save a item to pocket list
exports.saveItem = (accessToken, title, url) => {
  const data = {
    consumer_key: CONSUMER_KEY,
    access_token: accessToken,
    title,
    url
  };
  return fetch("https://getpocket.com/v3/add", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.log(err));
};
