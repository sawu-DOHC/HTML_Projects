class Task {

    element_task;
    string_div_id;
    string_src_id;
    string_src_parent_id;
    string_name;
    string_img_path;

    constructor( element ) {

        this.string_div_id = `task-${element.id}`;  
        this.string_src_id = element.id;
        this.string_src_parent_id = element.parent_id;
        this.string_name = element.name;
        this.string_img_path = element.image_path;

        this.element_task = document.createElement("div");
        this.element_task.id = this.string_div_id;
        this.element_task.className = "task";
        
        this.element_task.setAttribute('src_id', this.string_src_id);  
    
        const taskImg = document.createElement("img");
        taskImg.src = this.string_img_path;
    
        const taskTitle = document.createElement("span");
        taskTitle.textContent = this.string_name;
    
        this.element_task.appendChild(taskImg);
        this.element_task.appendChild(taskTitle);

        this.element_task.addEventListener("click", () => this.handleTaskClick());
    }

    handleTaskClick() {
        const srcID = this.element_task.getAttribute('src_id');  
    
        // Find the associated window for the clicked task
        const associatedWindow = document.querySelector(`#window-${srcID}`);
    
        // Bring the associated window to the front
        system.object_pane.bringWindowToFront(associatedWindow);
    
        // Ensure the window is displayed properly
        if (associatedWindow.style.display === "none") {
            associatedWindow.style.display = "flex";  
        } else {
            console.log(`window with ID ${srcID} is already visible.`);
        }
    
        // Manage the "active" state of tasks in the taskbar
        const allTasks = document.querySelectorAll('.task');
    
        // Remove 'active' class from all tasks to reset their state
        allTasks.forEach(task => task.classList.remove('active'));
    
        // Add the 'active' class to the clicked task
        this.element_task.classList.add('active');
    }
    
    
    
    

}
