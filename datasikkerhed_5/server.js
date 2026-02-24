const express = require("express");
const app = express();
const port = 3000;
const IP = "127.0.0.1";

// Henter middleware ind
const validerAPI = require("./middleware/validerAPI");

app.get("/noter", validerAPI, (req, res) => {
  res.json("Serveren kører");
});

app.listen(port, IP, () => {
  console.log(`Serveren kører på http://${IP}:${port}`);
});

// https://www.w3schools.com/nodejs/nodejs_rest_api.asp
// https://www.w3schools.com/nodejs/nodejs_express.asp
// https://www.youtube.com/watch?v=-MTSQjw5DrM
// https://www.w3schools.com/nodejs/nodejs_api_auth.asp
// https://www.npmjs.com/package/bcrypt
