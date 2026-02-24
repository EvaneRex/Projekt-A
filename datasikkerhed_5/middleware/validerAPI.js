const bcrypt = require("bcrypt");
const users = require("../apiKeys.json");

const validerAPI = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) return res.status(401).json({ error: "API nøgle mangler" });

  let gyldig = false;
  for (const hash of Object.values(users)) {
    if (await bcrypt.compare(apiKey, hash)) {
      gyldig = true;
      break;
    }
  }

  if (!gyldig) {
    console.log(`Ugyldig API-nøgle: ${apiKey} fra IP ${req.ip}`);
    return res.status(401).json({ error: "Ugyldig API-nøgle" });
  }

  next();
};

module.exports = validerAPI;
