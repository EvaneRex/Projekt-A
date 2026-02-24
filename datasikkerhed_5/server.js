const express = require("express");
const app = express();
const port = 3000;
const IP = "127.0.0.1";
const path = require("path");

const spil = require("./data/spil");
const garnforretninger = require("./data/garnforretninger");
const byggemarkeder = require("./data/byggemarkeder");

// Henter middleware ind
const validerAPI = require("./middleware/validerAPI");

// Routes
app.use(express.static(path.join(__dirname, "public")));

app.get("/spil", validerAPI, (req, res) => {
  if (!["Jan", "Lasse"].includes(req.user)) {
    return res.status(403).json({ error: "Nægtet adgang" });
  }
  res.json(spil);
});

app.get("/byggemarkeder", validerAPI, (req, res) => {
  if (!["Jan", "Lasse"].includes(req.user)) {
    return res.status(403).json({ error: "Nægtet adgang" });
  }
  res.json(byggemarkeder);
});
app.get("/garnforretninger", validerAPI, (req, res) => {
  if (!["Gitte"].includes(req.user)) {
    return res.status(403).json({ error: "Nægtet adgang" });
  }
  res.json(garnforretninger);
});

app.listen(port, IP, () => {
  console.log(`Serveren kører på http://${IP}:${port}`);
});

// https://www.w3schools.com/nodejs/nodejs_rest_api.asp
// https://www.w3schools.com/nodejs/nodejs_express.asp
// https://www.youtube.com/watch?v=-MTSQjw5DrM
// https://www.w3schools.com/nodejs/nodejs_api_auth.asp
// https://www.npmjs.com/package/bcrypt
