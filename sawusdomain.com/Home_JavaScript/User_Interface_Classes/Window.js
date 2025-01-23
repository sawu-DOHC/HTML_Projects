class Window {

    string_divID;
    string_imgSrc;
    string_title;
    element_window;


    constructor( sourceObject, index ) {

        var newsrcobj = sourceObject;

        this.string_divID = `window-${index}`;
        this.string_imgSrc = sourceObject.string_img_path;
        this.string_title = sourceObject.string_name;
        
        this.element_window = this.createWindowElement();
        this.element_window.style.display = "none";
        this.setWindowBody(sourceObject.string_body_content);

        this.task = new Task( sourceObject, index );
        const taskbar = document.getElementById("taskContainer");
        taskbar.appendChild( this.task.element_task );

    }

    createWindowElement() {
        // Create the main window div
        const windowDiv = document.createElement("div");
        windowDiv.id = this.string_divID;
        windowDiv.className = "window";
        windowDiv.addEventListener("click", () => this.bringWindowToFront());

        // Title bar
        const titleBar = document.createElement("div");
        titleBar.id = "TitleBar";
        titleBar.className = "title-bar";
        
        // Title bar icon
        const titleBarIcon = document.createElement("img");
        titleBarIcon.id = "TitleBarIcon";
        titleBarIcon.className = "title-bar-icon";
        titleBarIcon.src = this.string_imgSrc;
        
        // Title bar text
        const titleBarText = document.createElement("span");
        titleBarText.id = "TitleBarText";
        titleBarText.className = "title-text";
        titleBarText.textContent = this.string_title;
        
        // Minimize button
        const minimizeButton = document.createElement("button");
        minimizeButton.id = "MinimizeButton";
        minimizeButton.className = "button minimize-button";
        minimizeButton.textContent = "_";
        minimizeButton.addEventListener("click", () => this.minimizeWindow());
        
        // Maximize button
        const maximizeButton = document.createElement("button");
        maximizeButton.id = "MaximizeButton";
        maximizeButton.className = "button maximize-button";
        maximizeButton.textContent = "🗖";
        maximizeButton.addEventListener("click", () => this.maximizeWindow());
        
        // Close button
        const closeButton = document.createElement("button");
        closeButton.id = "CloseButton";
        closeButton.className = "button close-button";
        closeButton.textContent = "X";
        closeButton.addEventListener("click", () => this.closeWindow());
        
        // Append elements directly to the title bar
        titleBar.append(titleBarIcon, titleBarText, minimizeButton, maximizeButton, closeButton);
        
        // Create the Toolbar
        const toolbar = document.createElement("div");
        toolbar.id = "Toolbar";
        toolbar.className = "toolbar";
        // Create File button
        const fileButton = document.createElement("button");
        fileButton.id = "ToolbarFileButton";
        fileButton.className = "toolbar-button";
        fileButton.textContent = "File";
        fileButton.setAttribute("onclick", "console.log('File clicked')");
        toolbar.appendChild(fileButton);
        // Create Edit button
        const editButton = document.createElement("button");
        editButton.id = "ToolbarEditButton";
        editButton.className = "toolbar-button";
        editButton.textContent = "Edit";
        editButton.setAttribute("onclick", "console.log('Edit clicked')");
        toolbar.appendChild(editButton);
        // Create View button
        const viewButton = document.createElement("button");
        viewButton.id = "ToolbarViewButton";
        viewButton.className = "toolbar-button";
        viewButton.textContent = "View";
        viewButton.setAttribute("onclick", "console.log('View clicked')");
        toolbar.appendChild(viewButton);
        // Create Help button
        const helpButton = document.createElement("button");
        helpButton.id = "ToolbarHelpButton";
        helpButton.className = "toolbar-button";
        helpButton.textContent = "Help";
        helpButton.setAttribute("onclick", "console.log('Help clicked')");
        toolbar.appendChild(helpButton);


        // Create the WindowBody
        const windowBody = document.createElement("div");
        windowBody.id = "WindowBody";
        windowBody.className = "window-body";

        // Set initial visibility based on bool_visible
        windowDiv.style.display = this.string_visible;

        // Append all elements to the main window div
        windowDiv.append(titleBar, toolbar, windowBody);

        return windowDiv;
    }
    
    closeWindow() {
        console.log(`Closing window: ${this.string_title}`);
        this.element_window.style.display = "none";
        this.task.element_task.style.display = "none";
    }

    minimizeWindow() {
        console.log(`Minimizing window: ${this.string_title}`);
        this.element_window.style.display = "none";
    }

    showWindow() {
        console.log(`Showing window: ${this.string_title}`);
        this.element_window.style.display = "flex";
        this.task.element_task.style.display = "flex";
    }

    maximizeWindow() {
        console.log(`Toggling maximize for window: ${this.string_title}`);
    
        const windowElement = this.element_window;
    
        if (windowElement.classList.contains("maximized")) {
            // Restore to original size and position
            windowElement.classList.remove("maximized");
    
            // Restore original dimensions and position
            windowElement.style.width = this.originalWidth || "auto";
            windowElement.style.height = this.originalHeight || "auto";
            windowElement.style.top = this.originalTop || "50%";
            windowElement.style.left = this.originalLeft || "50%";
            windowElement.style.transform = "translate(-50%, -50%)";
        } 
        else {
            // Save current dimensions and position before maximizing
            this.originalWidth = windowElement.style.width;
            this.originalHeight = windowElement.style.height;
            this.originalTop = windowElement.style.top;
            this.originalLeft = windowElement.style.left;
    
            // Add the maximized class
            windowElement.classList.add("maximized");
    
            // Reset inline styles to let the class control layout
            windowElement.style.width = "";
            windowElement.style.height = "";
            windowElement.style.top = "";
            windowElement.style.left = "";
            windowElement.style.transform = "";
        }
    }
    
  
    setWindowBody(content) {
        const windowBody = this.element_window.querySelector(".window-body");
    
        console.log(`Setting window body for: ${this.string_title}`);
    
        if (!windowBody) {
            console.error("Window body element not found.");
            return;
        }
    
        if (typeof content === "string") {
            windowBody.innerHTML = content || "<p>No content available</p>";
        } 
        else if (content instanceof HTMLElement) {
            windowBody.innerHTML = "";
            windowBody.appendChild(content);
        } 

    }
    


    bringWindowToFront() {

        //console.log(`bringing window to front: ${this.string_title}`);

        const allWindows = document.querySelectorAll(".window");
        allWindows.forEach(win => {
            win.style.zIndex = 1;
        });

        this.element_window.style.zIndex = 1000;
    }
    
}

    
// IDEAL HTML     
 
// <div            id="Window"               class="window"                                                                           >
//  
// <div            id="TitleBar"             class="title-bar"                                                                        >
//        
//     <img        id="TitleBarIcon"         class="title-bar-icon"                    src="Home_Assets/ApplicationIcon.png"          >
//       
//     <span       id="TitleBarText"         class="title-text">                       Generic Application                     </span>
//       
//     <div        id="TitleBarControls"     class="title-bar-controls"                                                               >
// 
//         <button id="MinimizeButton"       class="title-bar-control-button" onclick= "minimizeWindow(' divID' )">     _     </button>
//  
//         <button id="MaximizeButton"       class="title-bar-control-button" onclick= "maximizeWindow( 'divID' )">     🗖    </button>
//  
//         <button id="CloseButton"          class="title-bar-control-button" onclick= "closeWindow(    'divID' )">     X     </button>
// 
//     </div                                                                                                                          >
// 
// </div                                                                                                                              >
// 
// <div            id="Toolbar"              class="toolbar"                                                                          >
// 
//     <button     id="ToolbarFileButton"    class="toolbar-button" onclick="console.log('File clicked')">            File    </button>
//     <button     id="ToolbarEditButton"    class="toolbar-button" onclick="console.log('Edit clicked')">            Edit    </button>
//     <button     id="ToolbarViewButton"    class="toolbar-button" onclick="console.log('View clicked')">            View    </button>
//     <button     id="ToolbarHelpButton"    class="toolbar-button" onclick="console.log('Help clicked')">            Help    </button>
// 
// </div                                                                                                                              >
// 
// <div            id="WindowBody"           class="window-body"                                                                      >
// <!-- DYNAMICALLY POPULATED AND UNIQUE TO EACH WINDOW-->
// </div                                                                                                                              >
// 


