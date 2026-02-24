const bcrypt = require("bcrypt");
const fs = require("fs");

const users = ["Jan", "Lasse", "Gitte"];
const hashedKeys = {};

async function generateKeys() {
  for (const user of users) {
    const apiKey = `key-for-${user.toLowerCase()}`;
    const hashedKey = await bcrypt.hash(apiKey, 10);
    hashedKeys[user] = hashedKey;
    console.log(`${user}'s API-nøgle: ${apiKey}`);
  }

  fs.writeFileSync("apiKeys.json", JSON.stringify(hashedKeys, null, 2));
}
generateKeys();
