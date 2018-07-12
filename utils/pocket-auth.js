const fetch = require("node-fetch");

// Pocket request variables
const CONSUMER_KEY = "77971-769a3aeb9fa7c467203a8474";
const URI = "http://localhost:3000";

/**
 * Pocket Authentication
 */

// 1. Obtain a request token
const requestToken = () => {
  const data = {
    consumer_key: CONSUMER_KEY,
    redirect_uri: URI
  };
  return fetch("https://getpocket.com/v3/oauth/request", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(data => {
      // remove "code="
      const token = data.slice("code=".length);
      return token;
    })
    .catch(err => console.log(err));
};

exports.requestToken = requestToken;

// 2. Redirect user to Pocket to continue authorization
// TODO: automate/ test with headless chrome browser??
const redirectAuth = requestToken => {
  return fetch(
    `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${URI}`
  )
    .then(res => res.text())
    .catch(err => console.log(err));
};

exports.redirectAuth = redirectAuth;

// 3. Convert a request token into a Pocket access token
const convertToken = token => {
  const data = {
    consumer_key: CONSUMER_KEY,
    code: token
  };
  return fetch("https://getpocket.com/v3/oauth/authorize", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-accept": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data.access_token)
    .catch(err => console.log(err));
};

exports.convertToken = convertToken;
