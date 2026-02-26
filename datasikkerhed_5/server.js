// Api'en, den sørger for at hente de relevante indformationer og styrer hvem der har adgang til hvad, i det her tilfælde er det for at simmulere hvordan forskellige brugere med forskeliige nøgler interagre med api'en og at det giver mening i demoen.

const express = require("express");
const app = express();
const port = 3000;
const IP = "127.0.0.1";
const path = require("path");
const cors = require("cors"); // Tilføjet i tilfælde af at der var cors-problemer, da der skiftevis var cors ting i consollen i browseren under test
app.use(cors());

// Henter data fra filerne ind
const spil = require("./data/spil");
const garnforretninger = require("./data/garnforretninger");
const byggemarkeder = require("./data/byggemarkeder");

// Henter middleware ind
const validerAPI = require("./middleware/validerAPI");

// Servere filerne fra public mappen af, så vi kan tilgå dem
app.use(express.static(path.join(__dirname, "public")));

// alt efter hvilken nøgle der bliver indtastet, så validere vi dem her og giver adgang til forskellige elementer baseret på brugerns nøgler og tilladelser
app.get("/data", validerAPI, (req, res) => {
  let data = [];

  if (req.user === "Jan") data = [...spil, ...byggemarkeder];
  else if (req.user === "Lasse") data = [...spil, ...byggemarkeder];
  else if (req.user === "Gitte") data = [...garnforretninger];
  else return res.status(403).json({ error: "Ingen adgang" });

  res.json({ user: req.user, data }); // Vi sender brugernavn og data tilbage som json, da vi bruger infomationerne i frontend
});

// Starter serveren
app.listen(port, IP, () => {
  console.log(`Serveren kører på http://${IP}:${port}`);
});
