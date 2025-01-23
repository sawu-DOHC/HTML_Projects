class Icon {
    string_divID;
    string_img_path;
    string_title;
    element_icon;

    string_link;
    string_description; // for hover function

    constructor( sourceObject, index ) {
        this.sourceObject = sourceObject; // Store the source object for reference
        this.string_divID = `icon-${index}`;
        this.string_img_path = sourceObject.string_img_path; // Fallback to empty string
        this.string_title = sourceObject.string_name;
        this.string_description = sourceObject.string_description;
        this.string_link = sourceObject.string_url;

        // Create the DOM element for the icon
        this.element_icon = this.createIconElement();

        // Add event listener to the image
        const imageElement = this.element_icon.querySelector("img");
        if (imageElement) {
            imageElement.addEventListener("click", () => this.handleIconClick(index));
        }
    }

    createIconElement() {
        // Create the main container
        const container = document.createElement("div");
        container.id = this.string_divID;
        container.classList.add("icon");

        // Create the image
        const img = document.createElement("img");
        img.src = this.string_img_path;
        img.alt = this.string_title;
        container.appendChild(img);

        // Create the title
        const h2 = document.createElement("h2");
        h2.textContent = this.string_title;
        container.appendChild(h2);

        // Create the description
        //const description = document.createElement("p");
        //description.textContent = this.string_description;
        //container.appendChild(description);

        return container;
    }

    handleIconClick(index) {
        const { string_type } = this.sourceObject;
    
        switch (string_type) {
            case "link":
                // Handle link click
                if (this.string_link) {
                    window.open(this.string_link, "_blank");
                } else {
                    console.warn(`No link provided for: ${this.string_title}`);
                }
                break;
    
            case "app":
                // Handle app click
                const appWindow = document.getElementById(`window-${index}`);
                const appTask = document.getElementById(`task-${index}`);
    
                if (appWindow) {
                    appWindow.style.display = "flex";
                    this.bringWindowToFront(appWindow);
                } else {
                    console.warn(`No associated window found for: ${this.string_title}`);
                }
    
                if (appTask) {
                    appTask.style.display = "flex";
                } else {
                    console.warn(`No associated task found for: ${this.string_title}`);
                }
                break;
    
            case "dir":
                // Handle directory click
                const dirWindow = document.getElementById(`window-${index}`);
                const dirTask = document.getElementById(`task-${index}`);
    
                if (dirWindow) {
                    dirWindow.style.display = "flex";
                    this.bringWindowToFront(dirWindow);
                } else {
                    console.warn(`No associated window found for: ${this.string_title}`);
                }
    
                if (dirTask) {
                    dirTask.style.display = "flex";
                } else {
                    console.warn(`No associated task found for: ${this.string_title}`);
                }
                break;
    
            default:
                // Handle unhandled types
                console.warn(`Unhandled type: ${string_type} for icon: ${this.string_title}`);
        }
    }
    

    bringWindowToFront(windowElement) {
        // Reset z-index for all windows
        const allWindows = document.querySelectorAll(".window");
        allWindows.forEach((win) => {
            win.style.zIndex = 1; // Send all windows to the background
        });

        // Bring the selected window to the front
        if (windowElement) {
            windowElement.style.zIndex = 1000;
        }
    }
}
