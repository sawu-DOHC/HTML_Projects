class Taskbar {

    taskbar;
    startButton;
    startMenu;
    taskContainer;
    clock;

    constructor() {

        this.taskbar = document.createElement('div');
        this.taskbar.id = 'taskbar';
        document.body.appendChild(this.taskbar);


        this.startButton = this.createStartButton();
        this.startMenu = this.createStartMenu();
        this.taskContainer = this.createTasksDiv();

        
        this.taskbar.appendChild(this.startButton);
        this.taskbar.appendChild(this.startMenu);
        this.taskbar.appendChild(this.taskContainer);


        this.clock = new Clock(); 
        this.taskbar.appendChild(this.clock.element);  

        console.log("Taskbar.constructor: created!");
    }

    insertTask( element ) {
        const taskId = `task-${element.id}`;
        let foundTask = this.taskContainer.querySelector(`#${taskId}`);
    
        if (!foundTask) {

            foundTask = new Task(element).element_task;
            this.taskContainer.appendChild(foundTask);
            this.toggleTaskDepressedState(element.id);
        } 
        else {
            console.log(`task already exists for element with ID: ${element.id}`); 
        }
    }
    removeTask( id ) {

        const taskId = `task-${id}`;
        

        const foundTask = document.getElementById(taskId);

        if (foundTask) {
            this.taskContainer.removeChild(foundTask);  
        }
    }
    createStartButton() {
        const button = document.createElement('button');
        button.id = 'start-button';

        const img = document.createElement('img');
        img.src = 'Home_Assets/windowsLogo.png';

        const span = document.createElement('span');
        span.textContent = 'Start';

        button.appendChild(img);
        button.appendChild(span);

        button.onclick = () => this.toggleStartMenu();
        return button;
    }
    // Step 1: Create the basic start menu without Shut Down menu
    createStartMenu() {
        const startMenu = document.createElement('div');
        startMenu.id = 'start-menu';
        startMenu.classList.add('menu');

        // Create the banner
        const banner = document.createElement('div');
        banner.id = 'banner';

        const bannerText = document.createElement('span');
        bannerText.id = 'banner-text';
        bannerText.textContent = 'Windows 95';
        banner.appendChild(bannerText);
        startMenu.appendChild(banner);

        // Create the root menu (ul)
        const rootMenu = document.createElement('ul');
        rootMenu.id = 'root-menu';
        rootMenu.classList.add('menu');

        const menuItems = [
            { id: 'programs', text: 'Programs', submenu: [] },
            { id: 'documents', text: 'Documents' },
            { id: 'settings', text: 'Settings' },
            { id: 'find', text: 'Find' },
            { id: 'help', text: 'Help' },
            { id: 'run', text: 'Run' },
        ];

        menuItems.forEach(item => {
            const li = document.createElement('li');
            li.id = item.id;
            li.classList.add('item');
            li.textContent = item.text;

            // Create submenu for "Programs" (leave empty for now)
            if (item.id === 'programs') {
                const submenu = document.createElement('ul');
                submenu.id = 'programs-submenu';  // This will be populated later
                submenu.classList.add('submenu', 'menu');
                li.appendChild(submenu);
            }

            rootMenu.appendChild(li);
        });

        startMenu.appendChild(rootMenu);
        document.body.appendChild(startMenu);

        return startMenu;
    }
    // Step 2: Initialize the "Programs" submenu once json_data is available
    initializeProgramsMenu() {
        const programsMenu = document.getElementById('programs-submenu');

        if (!programsMenu) {
            console.error('Programs submenu not found!');
            return;
        }

        // Clear existing items (if any)
        programsMenu.innerHTML = '';

        // Loop through json_data and add apps to the Programs submenu
        // Loop through json_data and add apps to the Programs submenu
        system.json_data.forEach(item => {
            if (item.type === "app") {
                const subLi = document.createElement('li');
                subLi.classList.add('item');
                subLi.textContent = item.name;
                subLi.setAttribute('srcid', item.id);
        
                // Attach the click event and pass srcid dynamically by accessing it from the event target
                subLi.addEventListener('click', (event) => {
                    const srcid = event.target.getAttribute('srcid'); //z Get the srcid from the clicked item
                    this.handleClick(srcid);
                });
        
                programsMenu.appendChild(subLi);
            }
        });


    }
    handleClick(srcid) {
        // Look up the element in the system.json_data array using the srcid
        const element = system.json_data.find(item => item.id === srcid);
        
        if (element) {
            // Pass the element to system.openApplication()
            system.openApplication(element);
        } 
        else {
            console.error(`Element with srcid ${srcid} not found in system.json_data.`);
        }
    }
    
    
    createTasksDiv() {
        const tasks = document.createElement('div');
        tasks.id = 'taskContainer';
        return tasks;  
    }
    toggleTaskDepressedState( srcID ) {
        // Get all tasks
        const allTasks = document.querySelectorAll('.task');
    
        // Remove the 'active' class from all tasks
        allTasks.forEach(task => {
            task.classList.remove('active');
        });
    
        // Add 'active' class to the clicked task
        const taskElement = document.querySelector(`#task-${srcID}`);
        if (taskElement) {
            taskElement.classList.add('active');
        } else {
            console.error(`task with src_id ${srcID} not found.`);
        }
    }
    toggleStartMenu(event) {
        const startMenu = document.getElementById("start-menu");
        const isVisible = startMenu.style.display === "flex";
    
        // Toggle the menu
        startMenu.style.display = isVisible ? "none" : "flex";
        
        // If the menu is being shown, add a click listener to close it when clicking outside or on menu items
        if (isVisible == false) {
            this.addOutsideClickListener(startMenu);
        }
    }
    
    addOutsideClickListener(startMenu) {
        const closeMenuIfClickedOutside = (event) => {
            // Check if the click is outside the menu and the start button
            if (!startMenu.contains(event.target) && !document.getElementById('start-button').contains(event.target)) {
                startMenu.style.display = "none";  // Close the menu
                document.removeEventListener('click', closeMenuIfClickedOutside);  // Remove the listener
            }
        };
    
        // Add event listener to the document to close the menu if clicked outside
        document.addEventListener('click', closeMenuIfClickedOutside);
    
        // Close the menu when a menu item is clicked
        const menuItems = startMenu.querySelectorAll('.item'); // Assuming all menu items have the class `.item`
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                startMenu.style.display = "none"; 
                document.removeEventListener('click', closeMenuIfClickedOutside); 
            });
        });
    }
    handleHover( menuItem ) {

        const itemText = menuItem.textContent;
    
        //console.log(`hovered over ${itemText}`);
    
        switch ( itemText ) {
            case 'Programs':
                menuItem.style.backgroundColor = '#a3d1ff';  
                this.programsMethod();
                break;
    
            case 'Documents':
                menuItem.style.backgroundColor = '#a3ffb3';  
                this.documentsMethod();
                break;
    
            case 'Settings':
                menuItem.style.backgroundColor = '#ffeb3b';  
                this.settingsMethod();
                break;
    
            case 'Find':
                menuItem.style.backgroundColor = '#ff7043';  
                this.findMethod();
                break;
    
            case 'Help':
                menuItem.style.backgroundColor = '#8e24aa';  
                this.helpMethod();
                break;
    
            case 'Run':
                menuItem.style.backgroundColor = '#4caf50';  
                this.runMethod();
                break;
    
            case 'Shut Down':
                menuItem.style.backgroundColor = '#f44336'; 
                this.shutDownMethod();
                break;
    
            default:
                // Handle any unrecognized menu item (if needed)
                menuItem.style.backgroundColor = '';  // Reset background color if it's not a recognized item
                console.log('Unrecognized menu item');
                break;
        }
    }
    handleLeave( menuItem ) {
        //console.log(`left hover on ${menuItem.textContent}`);
        menuItem.style.backgroundColor = ''; 
    }
    programsMethod() {
        
    }
    documentsMethod() {
        console.log('Documents method executed');
        // Add logic for handling "Documents"
    }
    settingsMethod() {
        //console.log('Settings method executed');
        // Add logic for handling "Settings"
    }
    findMethod() {
        //console.log('Find method executed');
        // Add logic for handling "Find"
    }
    helpMethod() {
        //console.log('Help method executed');
        // Add logic for handling "Help"
    }
    
    runMethod() {
        //console.log('Run method executed');
        // Add logic for handling "Run"
    }
    
    shutDownMethod() {
        //console.log('Shut Down method executed');
        // Add logic for handling "Shut Down"
    }
}
