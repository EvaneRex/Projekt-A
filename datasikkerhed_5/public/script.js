overskrift = document.getElementById("overskrift");
const liste = document.getElementById("liste");
const msg = document.getElementById("msg");
const input = document.getElementById("api-input");

document.getElementById("btn-submit").addEventListener("click", fetchData);

async function fetchData() {
  const apiKey = input.value;
  if (!apiKey) return;

  overskrift.textContent = "";
  liste.innerHTML = "";
  msg.textContent = "";

  try {
    const response = await fetch("http://127.0.0.1:3000/data", {
      headers: { "x-access-key": apiKey },
    });
    const resultat = await response.json();

    if (!response.ok) {
      msg.textContent = `Fejl: ${resultat.error}`;
      return;
    }

    overskrift.textContent = `Hej ${resultat.user}`;

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
    msg.textContent = "Netværksfejl";
  }
}
