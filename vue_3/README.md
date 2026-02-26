# Vue - 2. semester PBW

Dette er en opgave med Vue, og er opgave 3 i listen.

Opgavebeskrivelsen kan læses i index.html eller her:
Lav en komponent med et login-formular hvor du bruger ref til inputs. UI skal
vise valideringsfejl så som ugyldig email og for svagt password.

## Dependencies

- **vue** - Frontend framework
- **node** - For at køre projektet
- **npm** - for at kunne opstarte projektet

### Opstart

I terminalen køres

```bash
npm run dev
```

og derefter kører projektet

#### Noter

Input felterne ryddes automatisk hvis valideringen fejler, deruvoer får man først besked, når man har trykket submit. Det er fordi man får en "fælles" besked, så man kan ikke se om det var emailen eller koden der var forkert.
