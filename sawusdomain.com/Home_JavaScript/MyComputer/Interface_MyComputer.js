async function Interface_MyComputer() {
    const windowBody = document.querySelector("#Window-Body-1"); 

    // Create the label
    const label = document.createElement('label');
    label.textContent = "Page views: ";

    // Create a span for the view count (a more appropriate element for a single number)
    const counterSpan = document.createElement('span');
    counterSpan.id = 'counter';
    counterSpan.textContent = "0";  // Initialize with 0 views

    // Append label and span to the window body
    windowBody.appendChild(label);
    windowBody.appendChild(counterSpan);
}

Interface_MyComputer();
