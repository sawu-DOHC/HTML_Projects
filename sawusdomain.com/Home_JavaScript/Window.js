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

        // assign values from the raw item json data element
        this.string_div_id = `window-${element.id}`;  
        this.string_src_id = element.id;
        this.string_src_parent_id = element.parent_id;  
        this.string_name = element.name;  
        this.string_img_path = element.image_path;  
        this.string_type = element.type;

        // create the window element
        this.element_window = document.createElement("div");
        this.element_window.id = this.string_div_id;
        this.element_window.className = "window";


        // check if the element that was clicked is an icon or inside an icon
        // the .closest() method is useful for determining if an event is related to an element with a particular class, 
        // even if that class is not directly on the clicked element but on one of its ancestors.
        this.element_window.addEventListener("click", (event) => {
            
            if ( event.target.closest( '.icon' ) ) {
                //console.log('icon clicked, skipping bringWindowToFront.'); 
                return; 
            }
        
            // if the click was not on an icon, bring the window to the front
            system.object_pane.bringWindowToFront(this.element_window); 
        });
        
        // add identifying attributes, need to try and make it work on just one maybe
        this.element_window.setAttribute('src_id', this.string_src_id);
        this.element_window.setAttribute('parent_id', this.string_src_parent_id); 
        this.element_window.setAttribute('type', this.string_type);

        // used for click logic
        if (element.type === "app") {
            this.element_window.classList.add("app");
        }
        else if (element.type === "dir") {
            this.element_window.classList.add("dir");
        }

        // create title bar with controls (minimize, maximize, close)
        const titleBar = document.createElement("div");
        titleBar.id = "TitleBar";
        titleBar.className = "title-bar";

        const titleBarIcon = document.createElement("img");
        titleBarIcon.id = "TitleBarIcon";
        titleBarIcon.className = "title-bar-icon";
        titleBarIcon.src = this.string_img_path;
        titleBarIcon.addEventListener('mousedown', this.startDragging.bind(this) );

        const titleBarText = document.createElement("span");
        titleBarText.id = "TitleBarText";
        titleBarText.className = "title-text";
        titleBarText.textContent = this.string_name;
        titleBarText.addEventListener('mousedown', this.startDragging.bind(this));

        const minimizeButton = document.createElement("button");
        minimizeButton.id = "MinimizeButton";
        minimizeButton.className = "button minimize-button";
        minimizeButton.textContent = "_";
        minimizeButton.addEventListener("click", (event) => {
            event.stopPropagation();  // preventing the bringWindowToFront event
            this.minimizeWindow();
        });
        
        const maximizeButton = document.createElement("button");
        maximizeButton.id = "MaximizeButton";
        maximizeButton.className = "button maximize-button";
        maximizeButton.textContent = "🗖";
        maximizeButton.addEventListener("click", (event) => {
            event.stopPropagation();  
            this.maximizeWindow();
        });
        
        const closeButton = document.createElement("button");
        closeButton.id = "CloseButton";
        closeButton.className = "button close-button";
        closeButton.textContent = "X";
        closeButton.addEventListener("click", (event) => {
            event.stopPropagation();  
            this.closeWindow();
        });
        

        titleBar.append(titleBarIcon, titleBarText, minimizeButton, maximizeButton, closeButton);

        // create toolbar with buttons (File, Edit, View, Help)
        const toolbar = document.createElement("div");
        toolbar.id = "Toolbar";
        toolbar.className = "toolbar";

        const fileButton = document.createElement("button");
        fileButton.id = "ToolbarFileButton";
        fileButton.className = "toolbar-button";
        fileButton.textContent = "File";
        toolbar.appendChild(fileButton);

        const editButton = document.createElement("button");
        editButton.id = "ToolbarEditButton";
        editButton.className = "toolbar-button";
        editButton.textContent = "Edit";
        toolbar.appendChild(editButton);

        const viewButton = document.createElement("button");
        viewButton.id = "ToolbarViewButton";
        viewButton.className = "toolbar-button";
        viewButton.textContent = "View";
        toolbar.appendChild(viewButton);

        const helpButton = document.createElement("button");
        helpButton.id = "ToolbarHelpButton";
        helpButton.className = "toolbar-button";
        helpButton.textContent = "Help";
        toolbar.appendChild(helpButton);

        // create window body where content will be added
        const windowBody = document.createElement("div");
        windowBody.id = `Window-Body-${element.id}`;
        windowBody.className = "window-body";

        // append all elements to the main window div
        this.element_window.append( titleBar, toolbar, windowBody );
    }

    closeWindow() {


        const srcID = this.element_window.getAttribute('src_id');  

        
    
        const styleElement = document.getElementById(`style-${srcID}`);
        if (styleElement) {
            styleElement.remove();

        }
    
        const controllerElement = document.getElementById(`controller-${srcID}`);
        if (controllerElement) {
            controllerElement.remove();

        }
    
        const interfaceElement = document.getElementById(`interface-${srcID}`);
        if (interfaceElement) {
            interfaceElement.remove();

        }
    
        const taskElement = document.getElementById(`task-${srcID}`);
        if (taskElement) {
            //taskElement.remove();
            system.object_taskbar.removeTask( srcID );
        }
    
        const windowElement = document.getElementById(`window-${srcID}`);
        if (windowElement) {
            //windowElement.remove();
            system.object_pane.removeWindow( srcID );

        }
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
            windowElement.style.width = this.float_width;     // Restore original width
            windowElement.style.height = this.float_height;   // Restore original height
            windowElement.style.top = this.float_top;         // Restore original top position
            windowElement.style.left = this.float_left;       // Restore original left position
            windowElement.style.transform = "";               // Remove any transformations

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
    
        this.offsetX = event.clientX - rect.left;  // Mouse offset relative to the window's left
        this.offsetY = event.clientY - rect.top;   // Mouse offset relative to the window's top
    
        this.initialTop = rect.top;
        this.initialLeft = rect.left;
    
        this.isDragging = true;
    
        // Attach mousemove and mouseup listeners to the document
        document.addEventListener('mousemove', this.dragging.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
    }
    dragging( event ) {

        if ( this.isDragging ) {

            this.element_window.style.transform = "none"; // this ensures no transform interference during drag this is the key!

            const x = event.clientX - this.offsetX; // adjust window's left position
            const y = event.clientY - this.offsetY; // adjust window's top position
    
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

    