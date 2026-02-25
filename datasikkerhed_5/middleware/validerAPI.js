// Fungere som middleware, som tjekker om apinøgen kommer med fra headers/api-kaldet.
const bcrypt = require("bcrypt"); // vi skal bruge en af de indbyggede metoder til at sammenligne hashes
const users = require("../apiKeys.json");

const validerAPI = async (req, res, next) => {
  const apiKey = req.headers["x-access-key"]?.trim(); // vi tjekker nøglen og trimmer for at fjerne evt. mellemrum fra brugerens side

  // tjekker om der er en nøgle og hvis ikke så får vi en fejl status
  if (!apiKey) {
    return res.status(401).json({ error: "API nøgle mangler" });
  }

  let userFound = null;

  // Her der skal vi sammenligne hash med nøglen og hvilken bruger den hører til
  for (const [username, hash] of Object.entries(users)) {
    //object.entries giver os brugernavn og hash i et array som vi kører over
    if (await bcrypt.compare(apiKey, hash)) {
      // her er metoden compare som sammanligner indtastningen med en nøgle i vores apiKeys
      userFound = username; // matcher den, så gemmer vi brugernavnet
      break;
    }
  }

  // hvis nøglen ikke matcher så er det et uautoriseret forsøg og det smides i konsollen, man kunne også smide det i en logfil
  if (!userFound) {
    console.log(`Uautoriseret forsøg fra IP ${req.ip} med nøgle: ${apiKey}`);
    return res.status(401).json({ error: "Ugyldig API-nøgle" });
  }

  // findes brugeren og nøglen matcher, smider vi det også i konsollen bare for demos skyld
  req.user = userFound;
  console.log(`Autoriseret bruger: ${req.user}`);
  next();
};

module.exports = validerAPI;
