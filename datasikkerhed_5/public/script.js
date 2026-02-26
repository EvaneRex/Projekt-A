// script filen er udelukkende til demo, så vi kan se hvordan det fungere at indtaste de forskellige nøgler
overskrift = document.getElementById("overskrift");
const liste = document.getElementById("liste");
const msg = document.getElementById("msg");
const input = document.getElementById("api-input");

document.getElementById("btn-submit").addEventListener("click", fetchData);

async function fetchData() {
  const apiKey = input.value; // sætter input som variabel, som så kan sendes til serveren, det betyder den er "skjult" i forhold til koden, da den ikke bliver hardcoded ind og at den er emre variabel i forhold til at der er flere brugere

  if (!apiKey) return;

  input.value = "";

  overskrift.textContent = "";
  liste.innerHTML = "";
  msg.textContent = "";

  try {
    const response = await fetch("http://127.0.0.1:3000/data", {
      headers: { "x-access-key": apiKey }, // nøglen sendes som variabel med headers, hvor serveren så kan tjekke den i validerAPI.js og derefter give brugerne adgang til det de må se
    });
    const resultat = await response.json();

    // hvis der ikke er adgang, hvis nøglen er forkert eller andet, så får vi en fejl besked i msg feltet
    if (!response.ok) {
      msg.textContent = `Fejl: ${resultat.error}`;
      return;
    }

    overskrift.textContent = `Hej ${resultat.user}`; // Viser hvem der er inde, baseret på nøglen

    // indtagelse af data, alt efter hvilken type det er
    const byggList = resultat.data.filter((item) => item.type);
    const garnList = resultat.data.filter((item) => item.salg);
    const spilList = resultat.data.filter((item) => item.titel);

    function lavListe(titel, items, textFn) {
      if (items.length === 0) return;
      const h3 = document.createElement("h3");
      h3.textContent = titel;
      liste.appendChild(h3);
      const ul = document.createElement("ul");
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = textFn(item);
        ul.appendChild(li);
      });
      liste.appendChild(ul);
    }
    lavListe(
      "Spil",
      spilList,
      (item) => `${item.titel} — Udvikler: ${item.udvikler}`,
    );
    lavListe(
      "Byggemarkeder",
      byggList,
      (item) => `${item.navn} — Type: ${item.type}`,
    );
    lavListe(
      "Garnforretninger",
      garnList,
      (item) => `${item.navn} — Salg: ${item.salg}`,
    );
  } catch {
    msg.textContent = "Netværksfejl"; // Hvis serveren ikke køre eller der der er problemer så får vi fejlbesked
  }
}
