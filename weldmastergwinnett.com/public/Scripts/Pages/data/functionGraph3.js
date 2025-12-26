function renderGraph3(rows) {
    let loader = document.querySelector("#graph_3").previousElementSibling;
    if (loader) loader.style.display = "block";

    let x = [], y = [], z = [], color = [];

    for (let r of rows) {
        let rpm = parseFloat(r.rpm);
        let clt = parseFloat(r.clt);
        let ign = parseFloat(r.ign);

        if (Number.isFinite(rpm) && Number.isFinite(clt) && Number.isFinite(ign)) {
            x.push(rpm);
            y.push(clt);
            z.push(ign);
            color.push(ign);
        }
    }

    let trace = {
        x, y, z,
        type: "scatter3d",
        mode: "markers",
        marker: {
            size: 3,
            color,
            colorscale: [
                [0,   'rgba(16,46,60,1)'],
                [0.5, 'rgba(108,230,32,1)'],
                [1,   'rgba(227,22,22,1)']
            ],
            showscale: false
        },
        hovertemplate: "RPM=%{x}<br>CLT=%{y}°C<br>IGN=%{z}°<extra></extra>"
    };

    let layout = {
        uirevision: 'static',
        scene: {
            xaxis: { title: "RPM", dtick: 500 },
            yaxis: { title: "CLT (°C)", dtick: 5 },
            zaxis: { title: "Ignition (°)", dtick: 5 },
            camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } }
        },
        margin: { l: 0, r: 0, b: 0, t: 0 }
    };

    Plotly.newPlot("graph_3", [trace], layout, { responsive: true })
        .then(() => {
            if (loader) loader.style.display = "none";
        });
}
