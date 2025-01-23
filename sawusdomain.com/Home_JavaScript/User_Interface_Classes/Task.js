class Task {

    string_divID;
    string_img_path;
    string_title;
    element_task;
    associatedWindowID;

    constructor( sourceObject, index ) {

        this.sourceObject = sourceObject;

        this.string_divID = `task-${index}`; // Taskbar entry ID
        this.string_img_path = sourceObject.string_img_path; // Icon image source
        this.string_title = sourceObject.string_name; // Task title
        this.associatedWindowID = `window-${index}`; // Associated window ID

        this.element_task = this.createTaskElement(); // Create taskbar entry
        this.element_task.style.display = "none"; // Initially hidden

        // Add event listener to bring associated window to the front on click
        this.element_task.addEventListener("click", () => {
            this.bringAssociatedWindowToFront();
        });
    }

    createTaskElement() {
        // Create the main task div
        const taskDiv = document.createElement("div");
        taskDiv.id = this.string_divID;
        taskDiv.className = "taskbar-entry";

        // Create the task icon (image)
        const taskImg = document.createElement("img");
        taskImg.src = this.string_img_path;
        taskImg.alt = this.string_title;

        // Create the task title (span)
        const taskTitle = document.createElement("span");
        taskTitle.textContent = this.string_title;

        // Append the image and title to the task div
        taskDiv.appendChild(taskImg);
        taskDiv.appendChild(taskTitle);

        return taskDiv;
    }

    bringAssociatedWindowToFront() {
        console.log(`Bringing window to front for task: ${this.string_title}`);

        // Reset z-index for all windows
        const allWindows = document.querySelectorAll(".window");
        allWindows.forEach(win => {
            win.style.zIndex = 1; // Send all windows to the back
        });

        // Find and bring the associated window to the front
        const associatedWindow = document.getElementById(this.associatedWindowID);
        if (associatedWindow) {
            associatedWindow.style.zIndex = 1000; // Bring the associated window to the front
            associatedWindow.style.display = "flex"; // Ensure the window is visible
        } else {
            console.warn(`No window found for task: ${this.string_title}`);
        }
    }

    toggleVisibility() {
        // Toggle visibility of the task
        this.string_visible = this.string_visible === "flex" ? "none" : "flex";
        this.element_task.style.display = this.string_visible;
    }
}
