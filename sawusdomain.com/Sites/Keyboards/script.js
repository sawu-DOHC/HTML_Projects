const chartRegistry = {};

function changeTheme(season_string) {
    const body_element = document.body;

    const seasonColors = {
        winter: '#3b4a60',
        spring: '#d1c4e9',
        summer: '#fff176',
        fall:   '#ffe0b2'
    };
    document.querySelector('.color-side').style.backgroundColor = seasonColors[season_string] || '#000';

    body_element.style.transition = 'opacity 0.5s ease';
    body_element.style.opacity = '0';

    setTimeout(() => {
        body_element.classList.remove("winter", "spring", "summer", "fall");
        body_element.classList.add(season_string);

        document.querySelectorAll('.theme-bg').forEach(img => {
            img.classList.remove('active');
        });

        const img_to_show = document.getElementById(`bg-${season_string}`);
        if (img_to_show) {
            img_to_show.classList.add('active');
        }

        showSection(season_string);

        setTimeout(() => {
            body_element.style.opacity = '1';
        }, 50);
    }, 250);
}


function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
        targetSection.style.display = 'flex';

        // The old canvas ID (e.g. 'winterChart')
        const canvasId = sectionId + 'Chart';

        // 1) Destroy existing chart if needed
        if (chartRegistry[canvasId]) {
            chartRegistry[canvasId].destroy();
            delete chartRegistry[canvasId];
        }

        // 2) Remove the old canvas from the DOM
        const oldCanvas = document.getElementById(canvasId);
        if (oldCanvas) {
            const wrapper = oldCanvas.parentNode;
            wrapper.removeChild(oldCanvas);

            // 3) Create a new canvas element
            const newCanvas = document.createElement('canvas');
            newCanvas.id = canvasId;
            wrapper.appendChild(newCanvas);
        }

        // 4) Call the chart creation method for the chosen season
        switch (sectionId) {
            case 'winter':
                createWinterChart(canvasId);
                break;
            case 'spring':
                createSpringChart(canvasId);
                break;
            case 'summer':
                createSummerChart(canvasId);
                break;
            case 'fall':
                createFallChart(canvasId);
                break;
            default:
                console.warn(`Unknown section: ${sectionId}`);
                break;
        }
    }
}


function createFallChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.48, 3.49, 3.5],
            datasets: [{
                label: 'Fall Edition',
                data: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 60, 60, 60, 100],
                fill: false,
                backgroundColor: 'rgba(153, 102, 51, 0.2)',
                borderColor: 'rgba(153, 102, 51, 1)',
                borderWidth: 2,
                tension: 0,  // Set to zero for sharp edges
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            scales: {
                x: {
                    title: { display: true, text: 'Distance (mm)', color: '#fff' },
                    ticks: { color: '#fff' },
                    min: 0,
                    max: 3.5,
                    stepSize: 0.1,
                    beginAtZero: true
                },
                y: {
                    title: { display: true, text: 'Actuation Force (g)', color: '#fff' },
                    ticks: { color: '#fff', stepSize: 20 },
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyColor: '#fff',
                    titleColor: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }
    });
}
function createSpringChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
            datasets: [{
                label: 'Spring Edition',
                data: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 45, 45, 45, 46, 47, 48, 49, 50, 51, 100],
                fill: false,
                backgroundColor: 'rgba(75, 192, 75, 0.2)',
                borderColor: 'rgba(75, 192, 75, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            scales: {
                x: {
                    title: { display: true, text: 'Distance (mm)', color: '#fff' },
                    ticks: { color: '#fff' },
                    min: 0,
                    max: 4.0,
                    stepSize: 0.1,
                    beginAtZero: true
                },
                y: {
                    title: { display: true, text: 'Actuation Force (g)', color: '#fff' },
                    ticks: { color: '#fff', stepSize: 20 },
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyColor: '#fff',
                    titleColor: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }
    });
}
function createWinterChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
            datasets: [{
                label: 'Winter Edition',
                data: [40, 45, 50, 55, 62, 65, 64, 62, 60, 58, 55, 50, 47, 45, 43, 42, 40, 39, 38, 37, 36, 35, 34, 34, 34, 100],
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            scales: {
                x: {
                    title: { display: true, text: 'Distance (mm)', color: '#fff' },
                    ticks: { color: '#fff' },
                    min: 0,
                    max: 4.0,
                    stepSize: 0.1,
                    beginAtZero: true
                },
                y: {
                    title: { display: true, text: 'Actuation Force (g)', color: '#fff' },
                    ticks: { color: '#fff', stepSize: 20 },
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyColor: '#fff',
                    titleColor: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }
    });
}
function createSummerChart(canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0],
            datasets: [{
                label: 'Summer Edition',
                data: [20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 40, 37, 36, 35, 35, 35, 35, 35, 35, 100],
                fill: false,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            scales: {
                x: {
                    title: { display: true, text: 'Distance (mm)', color: '#fff' },
                    ticks: { color: '#fff' },
                    min: 0,
                    max: 4.0,
                    stepSize: 0.1,
                    beginAtZero: true
                },
                y: {
                    title: { display: true, text: 'Actuation Force (g)', color: '#fff' },
                    ticks: { color: '#fff', stepSize: 20 },
                    min: 0,
                    max: 100,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyColor: '#fff',
                    titleColor: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    //const seasons_array = ['winter', 'spring', 'summer', 'fall'];
    //const randomSeason_string = seasons_array[Math.floor(Math.random() * seasons_array.length)];
    changeTheme("winter");
});
