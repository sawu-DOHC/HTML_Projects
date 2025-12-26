function renderGraph1(rows) {
    let loader = document.querySelector("#graph_1").previousElementSibling;
    if (loader) loader.style.display = "flex";

    let x = [], y = [], z = [], color = [];

    for (let r of rows) {
        let rpm  = parseFloat(r.rpm);
        let fuel = parseFloat(r.fuel_cc_min);
        let ign  = parseFloat(r.ign);

        if (Number.isFinite(rpm) && Number.isFinite(fuel) && Number.isFinite(ign)) {
            x.push(rpm);
            y.push(fuel);
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
        hovertemplate: "RPM=%{x}<br>Fuel=%{y}<br>IGN=%{z}<extra></extra>"
    };

    let layout = {
        uirevision: "static",
        scene: {
            xaxis: { title: "RPM" },
            yaxis: { title: "Fuel" },
            zaxis: { title: "Ign" }
        },
        margin: { l:0, r:0, t:0, b:0 }
    };

    Plotly.newPlot("graph_1", [trace], layout)
        .then(() => { if (loader) loader.style.display = "none"; });
}
