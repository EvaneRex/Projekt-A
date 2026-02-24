const overskrift = document.getElementById("overskrift");
const liste = document.getElementById("liste");
const msg = document.getElementById("msg");

document
  .getElementById("btn-jan")
  .addEventListener("click", () => fetchData("Jan"));
document
  .getElementById("btn-lasse")
  .addEventListener("click", () => fetchData("Lasse"));
document
  .getElementById("btn-gitte")
  .addEventListener("click", () => fetchData("Gitte"));

async function fetchData(user) {
  const apiKey = prompt(`Indtast API-nøgle for ${user}:`);
  if (!apiKey) return;

  const endpoints = {
    Jan: ["/spil", "/byggemarkeder"],
    Lasse: ["/byggemarkeder", "/spil"],
    Gitte: ["/garnforretninger"],
  };

  liste.innerHTML = "";
  msg.innerHTML = "";
  let hasError = false;

  for (const endpoint of endpoints[user]) {
    try {
      const response = await fetch(`http://127.0.0.1:3000${endpoint}`, {
        headers: { "x-access-key": apiKey },
      });
      const data = await response.json();
      if (response.ok) {
        liste.innerHTML += `<li><strong>${endpoint.slice(1)}:</strong> ${JSON.stringify(data)}</li>`;
      } else {
        hasError = true;
        msg.innerHTML += `${endpoint.slice(1)}: Fejl - ${data.error}<br>`;
      }
    } catch (error) {
      hasError = true;
      msg.innerHTML += `${endpoint.slice(1)}: Netværksfejl<br>`;
    }
  }

  // Vis overskrift kun hvis ingen fejl
  if (!hasError) {
    overskrift.textContent = `Hej ${user}`;
  } else {
    overskrift.textContent = ""; // Ryd overskrift ved fejl
  }
}
