class Window {

    element_window;
    string_div_id;

    string_src_id;
    string_src_parent_id;
    string_type;

    float_width;
    float_height;
    float_top;
    float_left;

    string_name;
    string_img_path;
    
    z_index;              

    constructor( element ) {
        // Assign values from the raw item JSON data
        this.string_div_id = `window-${element.id}`;
        this.string_src_id = element.id;
        this.string_src_parent_id = element.parent_id;
        this.string_name = element.name;
        this.string_img_path = element.image_path;
        this.string_type = element.type;
    
        // Create the window element
        this.element_window = document.createElement("div");
        this.element_window.id = this.string_div_id;
        this.element_window.className = `window ${element.type}`;
    
        // Set attributes for reference
        this.element_window.setAttribute("src_id", this.string_src_id);
        this.element_window.setAttribute("parent_id", this.string_src_parent_id);
        this.element_window.setAttribute("type", this.string_type);
    
        // Define the HTML structure
        this.element_window.innerHTML = `
            <div id="TitleBar" class="title-bar">
                <img id="TitleBarIcon" class="title-bar-icon" src="${this.string_img_path}" draggable="false">
                <span id="TitleBarText" class="title-text">${this.string_name}</span>
                <button id="MinimizeButton" class="button minimize-button">_</button>
                <button id="MaximizeButton" class="button maximize-button">🗖</button>
                <button id="CloseButton" class="button close-button">X</button>
            </div>
            <div id="Toolbar" class="toolbar">
                <button id="ToolbarFileButton" class="toolbar-button">File</button>
                <button id="ToolbarEditButton" class="toolbar-button">Edit</button>
                <button id="ToolbarViewButton" class="toolbar-button">View</button>
                <button id="ToolbarHelpButton" class="toolbar-button">Help</button>
            </div>
            <div id="Window-Body-${element.id}" class="window-body"></div>
        `;
    
        // Add event listeners
        this.element_window.addEventListener("click", (event) => {
            if (!event.target.closest(".icon")) {
                system.object_pane.bringWindowToFront(this.element_window);
            }
        });
    
        this.element_window.querySelector("#TitleBarIcon").addEventListener("mousedown", this.startDragging.bind(this));
        this.element_window.querySelector("#TitleBarText").addEventListener("mousedown", this.startDragging.bind(this));
    
        this.element_window.querySelector("#MinimizeButton").addEventListener("click", (event) => {
            event.stopPropagation();
            this.minimizeWindow();
        });
    
        this.element_window.querySelector("#MaximizeButton").addEventListener("click", (event) => {
            event.stopPropagation();
            this.maximizeWindow();
        });
    
        this.element_window.querySelector("#CloseButton").addEventListener("click", (event) => {
            event.stopPropagation();
            this.closeWindow();
        });
    }
    

    closeWindow() {
        const srcID = this.element_window.getAttribute('src_id');  
    
        // Select all scripts and styles with the matching src_id in <head>
        const elements = document.head.querySelectorAll(`[src_id="${srcID}"]`);
    
        // Loop through the NodeList and remove each element
        elements.forEach(element => {
            element.remove();
        });
    
        // Remove the task entry
        system.object_taskbar.removeTask(srcID);
    
        // Remove the window itself
        system.object_pane.removeWindow(srcID);
    }
    
    
    
    
    minimizeWindow() {

    
        const windowElement = this.element_window;
    

        const rect = windowElement.getBoundingClientRect();
    
        this.float_width = rect.width + "px";
        this.float_height = rect.height + "px";
        this.float_top = rect.top + "px";
        this.float_left = rect.left + "px";

        windowElement.style.display = "none";  
    }
    restoreWindow() {

        console.log(`Restoring window: ${this.string_name}`);
    
        const windowElement = this.element_window;
    
        // ensure pixel values for position and size are captured
        if (this.float_width && this.float_height && this.float_top && this.float_left) {

            // apply the captured size and position
            windowElement.style.width = this.float_width;
            windowElement.style.height = this.float_height;
            windowElement.style.top = this.float_top;
            windowElement.style.left = this.float_left;
    
            // make sure the window is visible again
            windowElement.style.visibility = "visible"; // Ensures it becomes visible in the layout
    
            // remove the maximized state and any transform property
            windowElement.classList.remove("maximized");
            windowElement.style.transform = ""; 
    
            this.isMaximized = false; 
        } 
        else {
    
            windowElement.style.top = "50%";
            windowElement.style.left = "50%";
            windowElement.style.transform = "translate(-50%, -50%)"; // Centering for initial state

        }
    }
    maximizeWindow() {
        const windowElement = this.element_window;  // Assuming 'element_window' is the window element

        if (this.isMaximized) {
            console.log("window is already maximized. Restoring...");
    
            // Restore the window to its original size and position
            windowElement.style.width = this.float_width;     
            windowElement.style.height = this.float_height;   
            windowElement.style.top = this.float_top;         
            windowElement.style.left = this.float_left;       
            windowElement.style.transform = "";               

            this.isMaximized = false;
    
        } 
        else {
            console.log("Maximizing window...");
    
            // Store the current size and position before maximizing
            const rect = windowElement.getBoundingClientRect();
            this.float_width = rect.width + "px";
            this.float_height = rect.height + "px";
            this.float_top = rect.top + "px";
            this.float_left = rect.left + "px";
    
            // Set the window to full size
            windowElement.style.width = "100vw";   
            windowElement.style.height = "calc(100vh - 4.5rem)";  
            windowElement.style.top = "0";       
            windowElement.style.left = "0";       
            windowElement.style.transform = "none"; 
    
            // Set the maximized state to true
            this.isMaximized = true;


        }
    }
    showWindow() {

        this.element_window.style.display = "flex";


    }
    setWindowBody( content ) {
        
        const windowBody = this.element_window.querySelector(".window-body");
    
        windowBody.innerHTML = content;


    }
    startDragging(event) {

        // Bring the window to the front before starting the drag
        //system.object_pane.bringWindowToFront(this.element_window);
    
        if (window.innerWidth <= 750) {
            return;  
        }
    
        const rect = this.element_window.getBoundingClientRect();
    
        this.offsetX = event.clientX - rect.left;  
        this.offsetY = event.clientY - rect.top;   
    
        this.initialTop = rect.top;
        this.initialLeft = rect.left;
    
        this.isDragging = true;
    
        // Attach mousemove and mouseup listeners to the document
        document.addEventListener('mousemove', this.dragging.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
    }
    dragging( event ) {

        if ( this.isDragging ) {

            this.element_window.style.transform = "none"; 

            const x = event.clientX - this.offsetX; 
            const y = event.clientY - this.offsetY; 
    
            this.element_window.style.left = `${x}px`;
            this.element_window.style.top = `${y}px`;
        }
    }
    stopDragging() {

        this.isDragging = false;
    
        document.removeEventListener('mousemove', this.dragging.bind(this));
        document.removeEventListener('mouseup', this.stopDragging.bind(this));

    }
    
}

    