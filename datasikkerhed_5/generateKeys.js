//- Køres en gang inden man starter serveren op og når man kører projektet første gang, den gemmer de hashede nøgler i apiKeys.json og i forhold til det her projekt, har jeg smidt nøglerne i konsollen.
const bcrypt = require("bcrypt"); // er det man bruger til at hashe og salte nøglerne
const crypto = require("crypto"); // er det man bruger til at skabe tilfældige nøgler
const fs = require("fs");

const users = ["Jan", "Lasse", "Gitte"];
const hashedKeys = {};

// Hvis brugerne allerede findes i filen, eks. hvis man opretter en ny bruger, så overskrives de ikke
if (fs.existsSync("apiKeys.json")) {
  hashedKeys = JSON.parse(fs.readFileSync("apiKeys.json", "utf8"));
}

// Generer nøglerne for brugerne, både fra start men også hvis man skal tilføje en ny
async function generateKeys() {
  for (const user of users) {
    if (!hashedKeys[user]) {
      const apiKey = crypto.randomBytes(16).toString("hex"); // laver en tilfældig nøgle på 16 bytes som betyder at den er 32 tegn lang og hex betyder at den er lettere at læse end raw bytes
      const hashedKey = await bcrypt.hash(apiKey, 10); // den her hasher dem og salter dem af 10 omgange
      hashedKeys[user] = hashedKey;
      console.log(`${user}'s API-nøgle: ${apiKey}`); // Kun for at kunne se dem i konsollen, som "admin" kan jeg se dem alle, og derefter sende dem til brugerne
    }
  }

  fs.writeFileSync("apiKeys.json", JSON.stringify(hashedKeys, null, 2)); // gemmer dem i json filen, så serveren kan få adgang til dem. null og to er for at formatere json filen
}
generateKeys();
