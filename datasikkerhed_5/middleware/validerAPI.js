const apiKeys = require("../apiKeys");

const validerAPI = (req, res, next) => {
  console.log("middleware kører");

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API nøgle mangler" });
  }

  const gyldigAPIKey = Object.values(apiKeys).includes(apiKey);
  if (!gyldigAPIKey) {
    console.log("Ugyldig API nøgle");
    return res.status(401).json({ error: "Ugyldig API nøgle" });
  }
  next();
};

module.exports = validerAPI;
