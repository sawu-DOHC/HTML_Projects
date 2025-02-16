class Pane {
    div_pane;
    float_viewportHeight;
    float_viewportWidth;
    queue_windows;

    constructor() {
        this.div_pane = document.createElement('div');
        this.div_pane.id = "pane";
        document.body.appendChild(this.div_pane);

        this.queue_windows = [];
        console.log("Pane.constructor: created!");
    }

    insertWindow( element, json_data ) {

        this.float_viewportHeight = window.innerHeight;
        this.float_viewportWidth = window.innerWidth;
    
        // Check if the window with the same ID already exists
        const existingWindow = this.queue_windows.find(window => window.string_src_id === element.id);
    
        if (!existingWindow) {
            // Create a new window
            const newWindow = new Window(element);
    
            
    
            // Assign the z-index of the new window to the highest value
            newWindow.element_window.style.zIndex = this.queue_windows.length + 1; // highest z-index
            console.log(`Assigned z-index: ${newWindow.element_window.style.zIndex}`);
            console.log(`to window with src_id: ${element.id}`);
    
            // Add the new window to the front of the queue
            this.queue_windows.unshift(newWindow);
    
            // Log the queue contents after adding the window
            console.log(`queue contents after:`);
            
    
            // Append the new window to the pane
            this.div_pane.appendChild(newWindow.element_window);
    
            // Handle window content based on type
            switch ( element.type ) {
                case "dir":
                    const array_icons = json_data.filter(item => item.parent_id === element.id);
                    const appWindowBody = newWindow.element_window.querySelector(".window-body");
                    array_icons.forEach(iconData => {
                        const iconElement = new Icon(iconData).element_icon;
                        appWindowBody.appendChild(iconElement);
                    });
                    break;
    
                case "app":
                    break;
    
                default:
                    console.log("unhandled type", element.type);
                    break;
            }
    
            // Set the window position
            this.setWindowPosition(newWindow.element_window);
    
            // Re-render all windows to update z-index for all windows
            this.renderWindows();
        } 
        else {
            // Window already exists, skip creation
            console.log(`Window with ID ${element.id} already exists. Skipping creation.`);
        }
    }
    
    renderWindows() {
        // loop through the queue and assign z-index based on the position in the array

        for ( let index = 0; index < this.queue_windows.length; index++ ) {
            const window = this.queue_windows[index];
            window.element_window.style.zIndex = this.queue_windows.length - index; // Most recent window gets the highest z-index
        }
    }
    
    removeWindow( id ) {

        const windowIndex = this.queue_windows.findIndex( window => window.string_src_id === id );
        
        if (windowIndex !== -1) {
            // remove the window from the queue_windows array
            this.queue_windows.splice(windowIndex, 1);

            
            // also remove the window element from the DOM
            const windowElement = document.getElementById(`window-${id}`);
            if ( windowElement ) {
                windowElement.remove();
            }
        } 
        else {
            console.log(`window with ID ${id} not found in queue_windows.`);
        }
    }
    setWindowPosition(windowElement) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = windowElement.getBoundingClientRect();
    
        // Ensure the position is set to absolute for proper centering
        windowElement.style.position = "absolute";
    
        if (viewportWidth < 750) {
            // If the viewport is smaller than 750px, apply mobile styles
            windowElement.style.top = "50%";
            windowElement.style.left = "50%";
            windowElement.style.transform = "translate(-50%, -50%)";
            
            // Additional mobile styles
            windowElement.style.resize = "none";
            windowElement.style.width = "100%";
            windowElement.style.height = "100%";
        } 
        else {
            // Set size based on window type
            switch (windowElement.getAttribute("type")) {
                case "app":
                    //windowElement.style.width = "fit-content";
                    //windowElement.style.height = "fit-content";
                    windowElement.style.top = "50%";
                    windowElement.style.left = "50%";
                    windowElement.style.transform = "translate(-50%, -50%)"; 
                    break;
    
                case "dir":
                    windowElement.style.width = "50rem";  
                    windowElement.style.height = "40rem";
                    windowElement.style.top = "50%";
                    windowElement.style.left = "50%";
                    windowElement.style.transform = "translate(-50%, -50%)"; 
                    break;
    
                default:
                    windowElement.style.width = "25rem";
                    windowElement.style.height = "15rem";
                    break;
            }
        }
    } 
    bringWindowToFront(windowElement) {
        // Get the src_id from the windowElement
        const srcID = windowElement.getAttribute('src_id');
        
        // Find the window object in the queue based on the src_id
        const windowToMove = this.queue_windows.find(window => window.string_src_id === srcID);
        
        // Check if the window is already at the front (highest z-index)
        const highestIndex = this.queue_windows.length;
        
        if (windowToMove && parseInt(windowElement.style.zIndex) !== highestIndex) {
            // Only bring to the front if it's not already at the highest z-index
            console.log(`Moving window with src_id: ${srcID} to the front`);
            
            // Remove the window from the queue
            this.queue_windows = this.queue_windows.filter(window => window.string_src_id !== srcID);
            
            // Add the window back to the front of the queue
            this.queue_windows.unshift(windowToMove);
            
            // Update the z-index for the window to the highest value
            windowElement.style.zIndex = highestIndex;
            
            // Re-render all windows to update z-index for all windows
            this.renderWindows();
        } 
        else {
            console.log(`window with src_id: ${srcID} is already at the front (highest z-index).`);
        }

        const taskElement = document.querySelector(`#task-${srcID}`);
        
        if ( taskElement ) {

            const allTasks = document.querySelectorAll('.task');

            allTasks.forEach(task => task.classList.remove('active'));

            taskElement.classList.add('active');
        } 
        else {
            console.error(`task for window with src_id ${srcID} not found, dont forget to cancel execution of bring to front method when interacting with buttons, right now all your buttons need to prevent default behavior`);
        }
    }
    
    


    

    
    
    
    
}
 