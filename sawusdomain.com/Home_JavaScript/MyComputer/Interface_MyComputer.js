async function Interface_MyComputer() {

    const windowBody = document.querySelector("#Window-Body-1"); 


    const label = document.createElement('label');
    label.textContent = "Page views: ";

    const counterSpan = document.createElement('span');
    counterSpan.id = 'counter';
    counterSpan.textContent = "0";  

    windowBody.appendChild ( label );
    windowBody.appendChild( counterSpan );
}

Interface_MyComputer();
