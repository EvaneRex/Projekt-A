# Datasikkerhed - 2. semester PBW

Dette er en opgave omkring datasikkerhed, det er opgave 5 i listen af opgaver.

Opgavebeskrivelsen kan læses inde i index.html eller her:
Udvikl en API der kræver API-nøgler for adgang. Det står dig frit hvad API'en skal
give adgang til. Sørg for at forskellige brugere har forskellige nøgler og log forsøg på uautoriseret adgang.

Yderligere noter, apinøglerne skulle hashes lige som man gør ved adgangskoder

## Dependencies

For at køre opgaven, skal du have følgende pakker

- **express** - bruges til at lave API-serveren
- **bcrypt** - Hashing og saltning af API-nøgler
- **crypto** - Bruges til genering af tilfældige nøgler
- **cors** - Tillader cross-origin requests
- **node** - til at køre serveren og generateKeys.js

alt skal installeres via npm, borset fra crypto som er indbygget i node

### Opstart

Før man starter skal man køre

```bash
node generateKeys.js
```

det viser nøglerne i konsollen, hvor man som "admin" kan sende dem videre til brugerne og derefter skal man ikke bruge den fil igen

Der efter kører man

```bash
node server.js
```

og så kan man teste de forskellige nøgler af.

#### Noter

apiKeys.json fungere i det her tilfælde som en slags database, hvor de hashede nøgler ligger. Både den og generateKeys.js vill optimalt være smidt i .gitignore så de ikke blev smidt op, men her skal det kunne ses i forbindelse med aflevering.
