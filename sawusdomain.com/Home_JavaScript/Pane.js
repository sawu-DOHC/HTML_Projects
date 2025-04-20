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
    
        const existingWindow = this.queue_windows.find(window => window.string_src_id === element.id);
    
        if (!existingWindow) {

            const newWindow = new Window(element);
    

            newWindow.element_window.style.zIndex = this.queue_windows.length + 1; // highest z-index
            console.log(`Assigned z-index: ${newWindow.element_window.style.zIndex}`);
            console.log(`to window with src_id: ${element.id}`);
    

            this.queue_windows.unshift(newWindow);
    

            console.log(`queue contents after:`);
            
    

            this.div_pane.appendChild(newWindow.element_window);
    

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
    

            this.setWindowPosition(newWindow.element_window);

            this.renderWindows();
        } 
        else {

            console.log(`Window with ID ${element.id} already exists. Skipping creation.`);
        }
    }
    
    renderWindows() {


        for ( let index = 0; index < this.queue_windows.length; index++ ) {
            const window = this.queue_windows[index];
            window.element_window.style.zIndex = this.queue_windows.length - index; 
        }
    }
    
    removeWindow( id ) {

        const windowIndex = this.queue_windows.findIndex( window => window.string_src_id === id );
        
        if (windowIndex !== -1) {

            this.queue_windows.splice(windowIndex, 1);

            

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

        windowElement.style.position = "absolute";
    
        if (viewportWidth < 750) {

            windowElement.style.top = "50%";
            windowElement.style.left = "50%";
            windowElement.style.transform = "translate(-50%, -50%)";
            

            windowElement.style.resize = "none";
            windowElement.style.width = "100%";
            windowElement.style.height = "100%";
        } 
        else {

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

        const srcID = windowElement.getAttribute('src_id');
        

        const windowToMove = this.queue_windows.find(window => window.string_src_id === srcID);
        

        const highestIndex = this.queue_windows.length;
        
        if (windowToMove && parseInt(windowElement.style.zIndex) !== highestIndex) {

            console.log(`Moving window with src_id: ${srcID} to the front`);
            

            this.queue_windows = this.queue_windows.filter(window => window.string_src_id !== srcID);
            

            this.queue_windows.unshift(windowToMove);
            

            windowElement.style.zIndex = highestIndex;
            

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
 