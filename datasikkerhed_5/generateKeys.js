const bcrypt = require("bcrypt");
const fs = require("fs");

// Burde slettes efter filen er kørt eller endnu bedre genereres automatisk for bedre sikkerhed.
// const nøgler = {
//   Jan: "TilfældigkodeSmøre1",
//   Gitte: "2.TilfædigSmøre",
//   Lasse: "EndnuEnTilfædigSmøre",
// };

const hashedKeys = {};
for (const user in nøgler) {
  const hash = bcrypt.hashSync(nøgler[user], 10);
  hashedKeys[user] = hash;
  console.log(`Nøgle til ${user}: ${nøgler[user]}`);
}

fs.writeFileSync("apiKeys.json", JSON.stringify(hashedKeys, null, 2));
// apiKeys.json er erstatning for en rigtig database. For at det hele kører skal man først kører node generateKeys.js og så gemmer den de hashede i apiKeys.json
