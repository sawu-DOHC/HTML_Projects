function handleCellClick(td) {
    const metaScripts = td.querySelectorAll('.weld-meta');

    if (!metaScripts.length) return;

    const cardList = document.getElementById("cardList");
    cardList.innerHTML = "";

    metaScripts.forEach((script, index) => {
        const datum = JSON.parse(script.textContent);

        const card = document.createElement("div");
        card.className = "weld-card";
        card.innerHTML = `
            <div class="img-container">
              <span class="rank-label">#${index + 1}</span>
              <img src="${datum.img_src}" alt="${datum.description}">
            </div>
            <div class="data-container">
              <p>Welder: ${datum.welder_name}</p>
              <p>Description: ${datum.description}</p>
              <p>Amperage: ${datum.amperage}</p>
              <p>Voltage: ${datum.voltage}</p>
              <p>Frequency: ${datum.frequency}</p>
              <p>Balance: ${datum.balance}</p>
              <p>Duration: ${datum.duration}</p>
              <p>Wire Feed Speed: ${datum.wire_feed_speed}</p>
              <p>Filler Diameter: ${datum.filler_diameter}</p>
              <p>Gas Type: ${datum.gas_type}</p>
              <p>Gas Flow Rate: ${datum.gas_flow_rate}</p>
              <p>Polarity: ${datum.polarity}</p>
            </div>
        `;

        cardList.appendChild(card);
    });

    const leaderboard = document.getElementById("Leaderboard");
    leaderboard.classList.remove("hidden");
    leaderboard.classList.add("visible");
}
