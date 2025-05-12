CREATE TABLE resources_table (
    
    id INT PRIMARY KEY,
    parent_id INT DEFAULT NULL,
    type ENUM('dir', 'app', 'link') NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    url VARCHAR(255),
    css_path VARCHAR(255),
    ui_script VARCHAR(255),
    controller_script VARCHAR(255)

);


INSERT INTO resources_table (
    id,
    parent_id,
    type,
    name,
    description,
    image_path,
    url,
    css_path,
    ui_script,
    controller_script
) 
VALUES    
    (
    1, -- id
    0, -- parent_id
    'app', -- type
    'My Computer', -- name
    'Rig specs with links!', -- description
    'https://sawusdomain.com/Home_Assets/MyComputerIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/MyComputer.css', -- css script
    'https://sawusdomain.com/Home_JavaScript/MyComputer/Interface_MyComputer.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/MyComputer/Controller_MyComputer.js' -- controller_script
),
(
    2, -- id
    0, -- parent_id
    'app', -- type
    'Read Me', -- name
    'Welcome message.', -- description
    'https://sawusdomain.com/Home_Assets/TextFileIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/ReadMe.css', -- css script
    'https://sawusdomain.com/Home_JavaScript/ReadMe/Interface_ReadMe.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/ReadMe/Controller_ReadMe.js' -- controller_script
),
(
    3, -- id
    0, -- parent_id
    'dir', -- type
    'C Projects', -- name
    'All of my C++ projects on github!', -- description
    'https://sawusdomain.com/Home_Assets/FileIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/C_Projects.css', -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    4, -- id
    0, -- parent_id
    'dir', -- type
    'Java Projects', -- name
    'All of my Java projects on github!', -- description
    'https://sawusdomain.com/Home_Assets/FileIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/JavaProjects.css', -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    5, -- id
    0, -- parent_id
    'dir', -- type
    'HTML Projects', -- name
    'Links to my html projects, lots of JS and PHP!', -- description
    'https://sawusdomain.com/Home_Assets/FileIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/HTMLprojects.css', -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    6, -- id
    0, -- parent_id
    'dir', -- type
    'Python Projects', -- name
    'Link to my python projects!', -- description
    'https://sawusdomain.com/Home_Assets/FileIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/PythonProjects.css', -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    7, -- id
    0, -- parent_id
    'link', -- type 
    'E-Mail', -- name
    'Send me an email!', -- description
    'https://sawusdomain.com/Home_Assets/EmailIcon.png', -- image_path
    'mailto:wusadohc@gmail.com', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    8, -- id
    0, -- parent_id
    'app', -- type
    'Using NASAs api', -- name
    'Cute app that fetches a picture or video that NASA chose to highlight.', -- description
    'Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/NASAapi.css', -- css script (incremented correctly)
    'https://sawusdomain.com/Home_JavaScript/NASAapi/Interface_NASAapi.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/NASAapi/Controller_NASAapi.js' -- controller_script
),
(
    9, -- id
    0, -- parent_id
    'app', -- type
    'Temperature Converter', -- name
    'Simple JS project that does some calculations.', -- description
    'https://sawusdomain.com/Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/TempConvterter.css', -- css script (incremented)
    'https://sawusdomain.com/Home_JavaScript/TempConverter/Interface_TempConverter.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/TempConverter/Controller_TempConverter.js' -- controller_script
),
(
    10, -- id
    0, -- parent_id
    'app', -- type
    'Time Converter', -- name
    'Experimenting with time manipulation.', -- description
    'https://sawusdomain.com/Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/TimeConverter.css', -- css script (incremented)
    'https://sawusdomain.com/Home_JavaScript/TimeConverter/Interface_TimeConverter.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/TimeConverter/Controller_TimeConverter.js' -- controller_script
),
(
    11, -- id
    0, -- parent_id
    'app', -- type
    'Timer-Stopwatch', -- name
    'Timer and stopwatch function.', -- description
    'https://sawusdomain.com/Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/TimerStopwatch.css', -- css script
    'https://sawusdomain.com/Home_JavaScript/TimerStopwatch/Interface_TimerStopwatch.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/TimerStopwatch/Controller_TimerStopwatch.js' -- controller_script
),
(
    12, -- id
    0, -- parent_id
    'app', -- type
    'Using Coingecko API', -- name
    'Long-term and short-term divergence calculator, literally makes you rich!', -- description
    'https://sawusdomain.com/Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/CoingeckoAPI.css', -- css script
    'https://sawusdomain.com/Home_JavaScript/CoingeckoAPI/Interface_CoingeckoAPI.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/CoingeckoAPI/Controller_CoingeckoAPI.js' -- controller_script
),
(
    13, -- id
    5, -- parent_id
    'link', -- type
    'Fulton County Payroll Deduction Form', -- name
    'Digitizing an onboarding payroll deduction form.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/FCGAFormProject/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    14, -- id
    5, -- parent_id
    'link', -- type
    'Wild Rescues', -- name
    'Static website that utilizes HTML, CSS, and JS. Has media query for mobile devices.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/WildRescues/page1_index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    15, -- id
    5, -- parent_id
    'link', -- type
    'Strike A Chord', -- name
    'Static website that utilizes HTML, CSS, and JS. Has media query for mobile devices.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/StrikeAChord/page1_index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    16, -- id
    5, -- parent_id
    'link', -- type
    'Sam\'s Welds', -- name
    'Check out Sam\'s welds!', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://weldmastergwinnett.com', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    17, -- id
    5, -- parent_id
    'link', -- type
    'Online order form', -- name
    'Simple page that uses JS to calculate totals from selected items.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/FinalProject2/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    18, -- id
    5, -- parent_id
    'link', -- type
    'Timed math quiz', -- name
    'JS project that compares inputs with declared values and manipulates the HTML page to give the user feedback.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/SamsJSproject5/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    19, -- id
    5, -- parent_id
    'link', -- type
    'Input validation', -- name
    'This script demonstrates how to use JS to restrict user inputs.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/SamsJSproject7/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    20, -- id
    5, -- parent_id
    'link', -- type
    'Utilizing string query', -- name
    'This page uses string query technique to pass data from one page to another.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/SamsJSproject9/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    21, -- id
    0, -- parent_id
    'app', -- type
    'Inventory System', -- name
    'Inventory database (UNDER CONSTRUCTION).', -- description
    'https://sawusdomain.com/Home_Assets/ApplicationIcon.png', -- image_path
    NULL, -- url
    'https://sawusdomain.com/Home_CSS/Window_Styles/InventoryDatabase.css', -- css script
    'https://sawusdomain.com/Home_JavaScript/InventoryDatabase/Interface_InventoryDatabase.js', -- ui_script
    'https://sawusdomain.com/Home_JavaScript/InventoryDatabase/Controller_InventoryDatabase.js' -- controller_script
),
(
    22, -- id
    3, -- parent_id
    'link', -- type
    'School registration program', -- name
    'Program to manage student and course data, similar to a school scheduling/enrollment environment.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/C_Projects/tree/master/7%20School%20Registration%20Program', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    23, -- id
    3, -- parent_id
    'link', -- type
    'Replicating the vector class', -- name
    'A program to replicate the inner workings of the vector class using standard arrays.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/C_Projects/tree/master/7%20Replicating%20the%20Vector%20Class', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    24, -- id
    3, -- parent_id
    'link', -- type
    'Search Algorithms', -- name
    'Defining a reusable search algorithm class that contains multiple kinds of algorithms.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/C_Projects/tree/master/8%20Search%20Algorithms', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    25, -- id
    3, -- parent_id
    'link', -- type
    'Sort Algorithms', -- name
    'Defining a reusable sort algorithm class that contains multiple kinds of sort algorithms.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/C_Projects/tree/master/8%20Sort%20Algorithms', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    26, -- id
    4, -- parent_id
    'link', -- type
    'Lottery Game Data Management', -- name
    'Gathering statistics about lottery game data with extensive use of the Scanner class.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/Java_Projects/tree/master/7%20Lottery%20Game%20Data%20Management', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    27, -- id
    6, -- parent_id
    'link', -- type
    'Duplicate image remover', -- name
    'Detects duplicate images by generating hash functions for each image, wow!', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://github.com/sawu-DOHC/Python_Projects', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(   
    28, -- id
    6, -- parent_id
    'dir', -- type
    'Nested Directory a', -- name
    NULL, -- description
    'http://sawusdomain.com/Home_Assets/FileIcon.png', -- image path
    NULL, -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(   
    29, -- id
    28, -- parent_id
    'dir', -- type
    'Nested Directory b', -- name
    NULL, -- description
    'http://sawusdomain.com/Home_Assets/FileIcon.png', -- image path
    NULL, -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(   
    30, -- id
    29, -- parent_id
    'dir', -- type
    'Nested Directory c', -- name
    NULL, -- description
    'http://sawusdomain.com/Home_Assets/FileIcon.png', -- image path
    NULL, -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(   
    31, -- id
    5, -- parent_id
    'dir', -- type
    'Hiring Partner Database', -- name
    'Documentation and a link to my first database application.', -- description
    'http://sawusdomain.com/Home_Assets/FileIcon.png', -- image path
    NULL, -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    32, -- id
    31, -- parent_id
    'link', -- type
    'Hiring Partner Database App', -- name
    'Application that uses PHP and JS to manage an MySQL database. Features session tracking and user permissions.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/SamsJSproject13/HTML/page0_ViewLogin.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    33, -- id
    31, -- parent_id
    'link', -- type
    'Hiring Partner Database Documentation', -- name
    'Link to a public Google Docs directory that contains documentation for my database application.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://drive.google.com/drive/folders/1JLMfnITujrInAelqL5r_vxwCK4yuQ8d9', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    34, -- id
    5, -- parent_id
    'link', -- type
    'Keyboards!', -- name
    'Website to showcase keyboards, very comfy.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sawusdomain.com/Sites/Keyboards/index.html', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
),
(
    35, -- id
    5, -- parent_id
    'link', -- type
    'Spark Forge Labs', -- name
    'Babbys first e-commerce attempt for a local welding teacher.', -- description
    'https://sawusdomain.com/Home_Assets/InternetExplorerIcon.png', -- image_path
    'https://sparkforgelabs.com', -- url
    NULL, -- css script
    NULL, -- ui_script
    NULL -- controller_script
);



