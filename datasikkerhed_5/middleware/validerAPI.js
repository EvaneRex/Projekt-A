const bcrypt = require("bcrypt");
const fs = require("fs");
const users = require("../apiKeys.json");

const logFile = "./unauthorized.log";

const validerAPI = async (req, res, next) => {
  const apiKey = req.headers["x-access-key"];
  if (!apiKey) {
    fs.appendFileSync(
      logFile,
      `${new Date().toISOString()} - Manglende API-nøgle fra IP ${req.ip}\n`,
    );
    return res.status(401).json({ error: "API nøgle mangler" });
  }

  let gyldig = false;
  let user = null;
  for (const [username, hash] of Object.entries(users)) {
    if (await bcrypt.compare(apiKey, hash)) {
      gyldig = true;
      user = username;
      break;
    }
  }

  if (!gyldig) {
    fs.appendFileSync(
      logFile,
      `${new Date().toISOString()} - Ugyldig API-nøgle fra IP ${req.ip}\n`,
    );
    return res.status(401).json({ error: "Ugyldig API-nøgle" });
  }

  req.user = user;
  next();
};

module.exports = validerAPI;
