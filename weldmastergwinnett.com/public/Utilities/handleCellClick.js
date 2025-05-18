function handleCellClick(td) {
    const images = td.querySelectorAll('img');

    if (!images.length) return;

    const cardList = document.getElementById("cardList");
    cardList.innerHTML = "";

    images.forEach((img, index) => {
        const datum = {
            img_src: img.dataset.imgSrc,
            welder_name: img.dataset.welderName,
            description: img.dataset.description,
            amperage: img.dataset.amperage,
            voltage: img.dataset.voltage,
            frequency: img.dataset.frequency,
            balance: img.dataset.balance,
            duration: img.dataset.duration,
            wire_feed_speed: img.dataset.wireFeedSpeed,
            filler_diameter: img.dataset.fillerDiameter,
            gas_type: img.dataset.gasType,
            gas_flow_rate: img.dataset.gasFlowRate,
            polarity: img.dataset.polarity
        };

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
