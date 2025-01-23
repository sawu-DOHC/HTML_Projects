// Fetch raw JSON data from the PHP script
async function fetchJson() {

    const url = 'https://sawusdomain.com/Home_PHP/fetch_resources.php';

    try {
        const response = await fetch( url ); // Fetch data from the server
        const result = await response.json(); // Parse JSON response

        if ( result.success == true ) {
            return result.data; // Return raw JSON data
        } 
        else {
            console.error('Failed to fetch JSON:', result.message );
            return [];
        }
    } 
    catch ( error ) {
        console.error('Error while fetching JSON:', error);
        return [];
    }
}

function createSrcObjects( data ) {

    const srcObjects = []; 

    for (let i = 0; i < data.length; i++) {

        const item = data[i]; 

        const srcObj = new SrcObj(

            item.id,
            item.parent_id,
            item.type,
            item.name,
            item.description,
            item.image_path,
            item.url,
            item.body_content

        );

        srcObjects.push(srcObj);

    }

    return srcObjects; // Return the array of SrcObj instances
}
function populateDiv( targetDiv, srcObj_Array, parentId = null ) {

    const pane = document.getElementById("pane");
    const taskContainer = document.getElementById("taskContainer");

    for ( let i = 0; i < srcObj_Array.length; i++ ) {
        const currentObj = srcObj_Array[i];

        if ( currentObj.string_parent_id == parentId ) {
            switch ( currentObj.string_type ) {
                case "app":
                    const appWindow = new Window(currentObj, i);
                    const appIcon = new Icon(currentObj, i);

                    pane.appendChild(appWindow.element_window);
                    taskContainer.appendChild(appWindow.task.element_task);
                    targetDiv.appendChild(appIcon.element_icon);

                    appWindow.setWindowBody(currentObj.string_body_content);
                    break;

                case "dir":
                    const dirWindow = new Window(currentObj, i);
                    const dirIcon = new Icon(currentObj, i);

                    pane.appendChild(dirWindow.element_window);
                    taskContainer.appendChild(dirWindow.task.element_task);
                    targetDiv.appendChild(dirIcon.element_icon);

                    const windowBody = dirWindow.element_window.querySelector(".window-body");
                    if (srcObj_Array.some(obj => obj.string_parent_id == currentObj.string_id)) {
                        populateDiv(windowBody, srcObj_Array, currentObj.string_id);
                    }
                    break;

                case "link":
                    const linkIcon = new Icon(currentObj, i);
                    targetDiv.appendChild(linkIcon.element_icon);
                    break;

                default:
                    console.warn(`Unhandled type: ${currentObj.string_type}`);
            }
        }
    }
}











// Converts local JSON-like data into SrcObj instances
function createSrcObjectsLocal(data) {
    return data.map(item => new SrcObj(
        item.id,
        item.parentId,
        item.type,
        item.name,
        item.description,
        item.imagePath,
        item.url,
        item.bodyContent
    ));
}

function createSrcObjectsApi(data) {
    return data.map(item => new SrcObj(
        item.id,
        item.parent_id,
        item.type,
        item.name,
        item.description,
        item.image_path,
        item.url,
        item.body_content
    ));
}




const SrcObj_Array = [

    {
        id: 0,
        parentId: null,
        type: 'dir',
        name: 'Desktop',
        description: 'The desktop directory',
        imagePath: null,
        url: null,
        bodyContent: null
    },
    {
        id: 1,
        parentId: 0,
        type: 'app',
        name: 'My Computer',
        description: 'Rig specs with links!',
        imagePath: '/Home_Assets/MyComputerIcon.png',
        url: null,
        bodyContent: `
            <h2>System Specifications</h2>
            <ul>
                <li><strong>CPU:</strong><br><span>AMD Ryzen 9 7900X Raphael AM5 4.7GHz 12-Core</span></li>
                <li><strong>Motherboard:</strong><br><span>ASUS B650E-F AMD AM5 ATX</span></li>
                <li><strong>Video Card:</strong><br><span>RTX 3060 Ti</span></li>
                <li><strong>RAM:</strong><br>
                    <span>16GB DDR5-6000</span><br>
                    <span>16GB DDR5-6000</span><br>
                    <span>16GB DDR5-6000</span><br>
                    <span>16GB DDR5-6000</span>
                </li>
                <li><strong>Storage:</strong><br>
                    <span>1TB Crucial P3 M.2 (Read:3500/Write:3000)mb/s</span><br>
                    <span>1TB Crucial P3 M.2</span><br>
                    <span>1TB Crucial P3 M.2</span><br>
                    <span>4TB Western Digital Blue 5400 RPM, SATA 6 Gb/s, 256 MB Cache</span>
                </li>
                <li><strong>Power Supply:</strong><br><span>750Watt CX750M ATX Power Supply</span></li>
                <li><strong>Keyboard:</strong><br><span>Redragon BBK552 with TTC Linear 'Silent Frozen v2' switches</span></li>
                <li><strong>Mouse:</strong><br><span>Logitech G502</span></li>
            </ul>
        `
    },
    {
        id: 2,
        parentId: 0,
        type: 'app',
        name: 'Read Me',
        description: 'Welcome message.',
        imagePath: '/Home_Assets/TextFileIcon.png',
        url: null,
        bodyContent: `
            <p>This site contains links to all my programming projects. Please explore and remember this is a no bulli zone.</p>
        `
    },
    {
        id: 3,
        parentId: 0,
        type: 'app',
        name: "NASA's API",
        description: "Webpage that uses NASA's API.",
        imagePath: '/Home_Assets/ApplicationIcon.png',
        url: null,
        bodyContent: `
            <div id="description">
                This web application allows you to view the Astronomy Picture of the Day (APOD) provided by NASA. Select a date and the application will fetch the image and its description using NASA's API.
                The application makes an HTTP GET request to their API endpoint with the selected date as a parameter. The API responds with JSON data containing the image URL, title, and description. This data is then displayed on the page.
            </div>

            <div id="date-picker">
                <label for="dateBox">Select a Date:</label>
                <input type="date" id="dateBox">
                <button id="getButton" class="button" onclick="fetchNASAData()">Get</button>
            </div>

            <div id="warning"></div>

            <div id="dataContainer">
                <img id="nasaImage" src="Home_Assets/jpegIcon.png" alt="Default Image">
                <iframe id="nasaVideo"></iframe>
                <div id="imageDescription"></div>
            </div>
        `
    },
    {
        id: 4,
        parentId: 0,
        type: 'app',
        name: 'Temperature Converter',
        description: 'Simple JS project that does some calculations.',
        imagePath: '/Home_Assets/ApplicationIcon.png',
        url: null,
        bodyContent: `
            <h3>Fahrenheit (°F) ↔ Celsius (°C)</h3>
            <div class="temperature-converter">
                <label for="fahrenheitField">°F:</label>
                <input type="number" id="fahrenheitField" oninput="fahrenheitToCelsius()" />
                <div class="arrow">⇅</div>
                <label for="celsiusField">°C:</label>
                <input type="number" id="celsiusField" oninput="celsiusToFahrenheit()" />
            </div>
            <p>Enter a temperature in either box to convert.</p>
        `
    },
    {
        id: 5,
        parentId: 0,
        type: 'app',
        name: 'Time Converter',
        description: 'Experimenting with time manipulation.',
        imagePath: '/Home_Assets/ApplicationIcon.png',
        url: null,
        bodyContent: `
            <p>
                The Unix epoch is the time 00:00:00 which corresponds to January 1, 1970. That moment serves as a reference point from which time is measured in seconds. This means that any date and time is represented as the number of seconds that have elapsed since this point.
            </p>

            <div id="alertBox"></div>

            <!-- Start Date and Time -->
            <div id="startDiv" class="input-row">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate">
                <label for="startTime">Start Time:</label>
                <input type="time" id="startTime">
            </div>

            <br>
            <br>

            <!-- End Date and Time -->
            <div id="endDiv" class="input-row">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate">
                <label for="endTime">End Time:</label>
                <input type="time" id="endTime">
            </div>

            <!-- Results Section -->
            <div id="resultDiv">
                <div class="button-container">
                    <button id="calculateButton" class="button" onclick="calculateDifference()">Calculate Difference</button>
                </div>
                <div>
                    <p>Result</p>
                    <input type="text" id="resultBox" readonly>
                </div>
            </div>

            <br>

            <!-- Current Time Section -->
            <div id="currentTimeContainer">
                <p>Seconds since 1/1/1970:</p>
                <span id="currentTimeDisplay">0</span>
            </div>
        `
    },
    {
        id: 6,
        parentId: 0,
        type: 'app',
        name: 'Timer-Stopwatch',
        description: 'Timer and stopwatch function.',
        imagePath: '/Home_Assets/ApplicationIcon.png',
        url: null,
        bodyContent: `
            <div id="stopwatch-container">
                <h2>Stopwatch</h2>
                <p id="stopwatch-display">00:00:00</p>
                <div class="button-container">
                    <button id="start-stopwatch" class="button start-button" onclick="startStopwatch()">Start</button>
                    <button id="stop-stopwatch" class="button stop-button" onclick="stopStopwatch()">Stop</button>
                    <button id="reset-stopwatch" class="button reset-button" onclick="resetStopwatch()">Reset</button>
                </div>
            </div>

            <div id="timer-container">
                <h2>Timer</h2>
                <label for="timer-minutes">Minutes:</label>
                <input type="number" id="timer-minutes" min="0" placeholder="0">
                <label for="timer-seconds">Seconds:</label>
                <input type="number" id="timer-seconds" min="0" max="59" placeholder="0">
                <p id="timer-display">00:00</p>
                <div class="button-container">
                    <button id="start-timer" class="button start-button" onclick="startTimer()">Start</button>
                    <button id="stop-timer" class="button stop-button" onclick="stopTimer()">Stop</button>
                    <button id="reset-timer" class="button reset-button" onclick="resetTimer()">Reset</button>
                </div>
            </div>
        `
    },
    {
        id: 7,
        parentId: 0,
        type: 'app',
        name: 'Using Coingecko API',
        description: 'Long-term and short-term divergence calculator, literally makes you rich!',
        imagePath: '/Home_Assets/ApplicationIcon.png',
        url: null,
        bodyContent:`
            <div class="title-container">
                <h1 id="title-1">Divergence Calculator</h1>
                <h1 id="title-1">Online Broker</h1>
                <h1 id="title-2">Get Rich For Free App!</h1>
            </div>
            <div id="main-container">
                <select id="currency-menu">
                    <option value="" disabled selected>Select a currency</option>
                </select>
                <br>
                <select id="strategy-menu" disabled>
                    <option value="" disabled selected>Select a strategy</option>
                    <option value="wolf">wolf</option>
                    <option value="normie">normie</option>
                </select>
                <div id="stats-box">
                    <div>Long-Term Average: $<span id="long-term-stat"></span></div>
                    <div>Short-Term Average: $<span id="short-term-stat"></span></div>
                </div>
                <div class="signal-container">
                    <div class="traffic-signal">
                        <div id="signal-green" class="signal"></div>
                        <div id="signal-yellow" class="signal"></div>
                        <div id="signal-red" class="signal"></div>
                    </div>
                </div>
                <div class="message-box">
                    <p id="message-text"></p>
                </div>
                <textarea id="text-box" readonly></textarea>
            </div>
        `
    },
    {
        id: 8,
        parentId: 0,
        type: 'dir',
        name: 'C Projects',
        description: 'All of my C++ projects on github!',
        imagePath: '/Home_Assets/FileIcon.png',
        url: null,
        bodyContent: null
    },
    {
        id: 9,
        parentId: 0,
        type: 'dir',
        name: 'Java Projects',
        description: 'All of my Java projects on github!',
        imagePath: '/Home_Assets/FileIcon.png',
        url: null,
        bodyContent: null
    },

    {
        id: 10,
        parentId: 0,
        type: 'link',
        name: 'E-Mail',
        description: 'Send me an email!',
        imagePath: '/Home_Assets/EmailIcon.png',
        url: 'mailto:example@example.com',
        bodyContent: null
    },
    {
        id: 11,
        parentId: 0,
        type: 'link',
        name: 'Fulton County Payroll Deduction Form',
        description: 'Digitizing an onboarding payroll deduction form.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/FCGAFormProject/index.html',
        bodyContent: null
    },
    {
        id: 12,
        parentId: 0,
        type: 'link',
        name: 'Wild Rescues',
        description: 'Static website that utilizes HTML, CSS, and JS. Has media query for mobile devices.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/WildRescues/page1_index.html',
        bodyContent: null
    },
    {
        id: 13,
        parentId: 0,
        type: 'link',
        name: 'Strike A Chord',
        description: 'Static website that utilizes HTML, CSS, and JS. Has media query for mobile devices.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/StrikeAChord/page1_index.html',
        bodyContent: null
    },
    {
        id: 14,
        parentId: 0,
        type: 'link',
        name: "Sam's Welds",
        description: "Check out Sam's welds!",
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/Weld/index.html',
        bodyContent: null
    },
    {
        id: 15,
        parentId: 0,
        type: 'link',
        name: 'Online order form',
        description: 'Simple page that uses JS to calculate totals from selected items.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/FinalProject2/index.html',
        bodyContent: null
    },
    {
        id: 16,
        parentId: 0,
        type: 'link',
        name: 'Timed math quiz',
        description: 'JS project that compares inputs with declared values and manipulates the HTML page to give the user feedback.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/SamsJSproject5/index.html',
        bodyContent: null
    },
    {
        id: 17,
        parentId: 0,
        type: 'link',
        name: 'Hiring Partner Database Documentation',
        description: 'Link to a public Google Docs directory that contains documentation for my database application.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com//drive/folders/1dxXinOgHsTGpP_dAxbSq6UeskfoGcGb-?ths=true',
        bodyContent: null
    },
    {
        id: 18,
        parentId: 0,
        type: 'link',
        name: 'Input validation',
        description: 'This script demonstrates how to use JS to restrict user inputs.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/SamsJSproject7/index.html',
        bodyContent: null
    },
    {
        id: 19,
        parentId: 0,
        type: 'link',
        name: 'Utilizing string query',
        description: 'This page uses string query technique to pass data from one page to another.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/SamsJSproject9/index.html',
        bodyContent: null
    },
    {
        id: 20,
        parentId: 0,
        type: 'link',
        name: 'Hiring Partner Database',
        description: 'Application that uses PHP and JS to manage an SQL database. Features session tracking and user permissions.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/SamsJSproject13/HTML/page0_ViewLogin.html',
        bodyContent: null
    },
    {
        id: 21,
        parentId: 0,
        type: 'link',
        name: 'Inventory System',
        description: 'Inventory database (UNDER CONSTRUCTION).',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/InventoryDatabaseApp/HTML/page1_Home.html',
        bodyContent: null
    },
    {
        id: 22,
        parentId: 0,
        type: 'link',
        name: 'Using coingecko API',
        description: 'Long-term and short-term divergence calculator, literally makes you rich!',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://sawusdomain.com/Sites/OnlineBroker/index.html',
        bodyContent: null
    },
    {
        id: 23,
        parentId: 8,
        type: 'link',
        name: 'School registration program',
        description: 'Program to manage student and course data, similar to a school scheduling/enrollment environment.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://github.com/sawu-DOHC/C-Projects/tree/master/7%20School%20Registration%20Program',
        bodyContent: null
    },
    {
        id: 24,
        parentId: 8,
        type: 'link',
        name: 'Replicating the vector class',
        description: 'A program to replicate the inner workings of the vector class using standard arrays.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://github.com/sawu-DOHC/C-Projects/tree/master/7%20Replicating%20the%20Vector%20Class',
        bodyContent: null
    },
    {
        id: 25,
        parentId: 8,
        type: 'link',
        name: 'Search Algorithms',
        description: 'Defining a reusable search algorithm class that contains multiple kinds of algorithms.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://github.com/sawu-DOHC/C-Projects/tree/master/8%20Search%20Algorithms',
        bodyContent: null
    },
    {
        id: 26,
        parentId: 8,
        type: 'link',
        name: 'Sort Algorithms',
        description: 'Defining a reusable sort algorithm class that contains multiple kinds of sort algorithms.',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://github.com/sawu-DOHC/C-Projects/tree/master/8%20Sort%20Algorithms',
        bodyContent: null
    },
    {
        id: 27,
        parentId: 9,
        type: 'link',
        name: 'Lottery game data Management',
        description: 'An exercise in logic, managing streams, creating objects and formatting console outputs to be readable',
        imagePath: '/Home_Assets/InternetExplorerIcon.png',
        url: 'https://github.com/sawu-DOHC/Java-Projects/tree/master/7%20Lottery%20Game%20Data%20Management',
        bodyContent: null
    }

];
