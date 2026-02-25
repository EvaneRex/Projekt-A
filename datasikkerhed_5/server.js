const express = require("express");
const app = express();
const port = 3000;
const IP = "127.0.0.1";
const path = require("path");
const cors = require("cors");
app.use(cors());

const spil = require("./data/spil");
const garnforretninger = require("./data/garnforretninger");
const byggemarkeder = require("./data/byggemarkeder");

// Henter middleware ind
const validerAPI = require("./middleware/validerAPI");

// Routes
app.use(express.static(path.join(__dirname, "public")));

// server.js
app.get("/data", validerAPI, (req, res) => {
  let data = [];

  if (req.user === "Jan") data = [...spil, ...byggemarkeder];
  else if (req.user === "Lasse") data = [...spil, ...byggemarkeder];
  else if (req.user === "Gitte") data = [...garnforretninger];
  else return res.status(403).json({ error: "Ingen adgang" });

  res.json({ user: req.user, data });
});

app.listen(port, IP, () => {
  console.log(`Serveren kører på http://${IP}:${port}`);
});

// https://www.w3schools.com/nodejs/nodejs_rest_api.asp
// https://www.w3schools.com/nodejs/nodejs_express.asp
// https://www.youtube.com/watch?v=-MTSQjw5DrM
// https://www.w3schools.com/nodejs/nodejs_api_auth.asp
// https://www.npmjs.com/package/bcrypt
// https://www.w3schools.com/nodejs/nodejs_crypto.asp
