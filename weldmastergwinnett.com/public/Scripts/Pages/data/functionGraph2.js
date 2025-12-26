function renderGraph2(rows) {
    let loader = document.querySelector("#graph_2").previousElementSibling;
    if (loader) loader.style.display = "block";

    let x = [], y = [], z = [], color = [];

    for (let r of rows) {
        let rpm  = parseFloat(r.rpm);
        let fuel = parseFloat(r.fuel_cc_min);
        let maf  = parseFloat(r.maf);

        if (Number.isFinite(rpm) && Number.isFinite(fuel) && Number.isFinite(maf)) {
            x.push(rpm);
            y.push(fuel);
            z.push(maf);
            color.push(maf);
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
        hovertemplate: "RPM=%{x}<br>Fuel=%{y} cc/min<br>MAF=%{z} g/s<extra></extra>"
    };

    let layout = {
        uirevision: 'static',
        scene: {
            xaxis: { title: "RPM", dtick: 500 },
            yaxis: { title: "Fuel (cc/min)", dtick: 50 },
            zaxis: { title: "MAF (g/s)", dtick: 5 },
            camera: { eye: { x: 1.6, y: 1.6, z: 1.1 } }
        },
        margin: { l: 0, r: 0, b: 0, t: 0 }
    };

    Plotly.newPlot("graph_2", [trace], layout, { responsive: true })
        .then(() => {
            if (loader) loader.style.display = "none";
        });
}
