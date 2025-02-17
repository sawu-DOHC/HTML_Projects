class Row {

    constructor(itemId, description, partNumber, qoh, lastUpdated) {
        this.itemId = itemId;
        this.description = description;
        this.partNumber = partNumber;
        this.qoh = qoh;
        this.lastUpdated = lastUpdated;
    }

    insertRow(targetElement) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-item-id', this.itemId);
        tr.setAttribute('id', 'row-' + this.itemId);

        tr.appendChild(this.createDescriptionCell());
        tr.appendChild(this.createPartNumberCell());
        tr.appendChild(this.createQOHCell());
        tr.appendChild(this.createLastUpdatedCell());
        tr.appendChild(this.createActionsCell());

        targetElement.appendChild(tr);
    }

    createDescriptionCell() {
        const tdDescription = document.createElement('td');
        tdDescription.setAttribute('id', 'description-' + this.itemId);
        tdDescription.classList.add('description');
        
        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('value', this.description);
        descriptionInput.setAttribute('id', 'description');
        descriptionInput.classList.add('description-input');
        descriptionInput.setAttribute('disabled', 'true'); // Disable input

        tdDescription.appendChild(descriptionInput);

        return tdDescription;
    }

    createPartNumberCell() {
        const tdPartNumber = document.createElement('td');
        tdPartNumber.setAttribute('id', 'part-number-' + this.itemId);
        tdPartNumber.classList.add('part-number');
        const partNumberInput = document.createElement('input');
        partNumberInput.setAttribute('type', 'text');
        partNumberInput.setAttribute('value', this.partNumber);
        partNumberInput.setAttribute('id', 'part_number');
        partNumberInput.classList.add('part-number-input');
        partNumberInput.setAttribute('disabled', 'true'); // Disable input
    
        tdPartNumber.appendChild(partNumberInput);
    
        return tdPartNumber;
    }
    
    createQOHCell() {
        const tdQOH = document.createElement('td');
        tdQOH.setAttribute('id', 'qoh-' + this.itemId);
        tdQOH.classList.add('qoh');
    
        const qohInput = document.createElement('input');
        qohInput.setAttribute('type', 'text');
        qohInput.setAttribute('value', this.qoh);
        qohInput.setAttribute('id', 'qoh'); 
        qohInput.classList.add('qoh-input');
        qohInput.setAttribute('disabled', 'true'); // Disable input
    
        tdQOH.appendChild(qohInput);
    
        return tdQOH;
    }

    createLastUpdatedCell() {
        const tdLastUpdated = document.createElement('td');
        tdLastUpdated.setAttribute('id', 'last-updated-' + this.itemId);
        tdLastUpdated.classList.add('last-updated');
        tdLastUpdated.textContent = this.lastUpdated;
        return tdLastUpdated;
    }

    createActionsCell() {
        const tdActions = document.createElement('td');
        tdActions.setAttribute('id', 'actions-' + this.itemId);
        tdActions.classList.add('actions');

        const addToCartButton = document.createElement('button');
        addToCartButton.setAttribute('id', 'add-to-cart');
        addToCartButton.textContent = 'Add';

        addToCartButton.addEventListener('click', () => {
    const row = addToCartButton.closest('tr');
    const itemId = row.getAttribute('data-item-id');
    
    // Get the description and part number from the input fields instead of textContent
    const description = row.querySelector('.description-input').value; // Get value from input field
    const partNumber = row.querySelector('.part-number-input').value; // Get value from input field
    
    // Always increment the quantity by 1
    cart.addItem(itemId, description, partNumber);
});

        
        

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', 'delete-item');
        deleteButton.textContent = 'Delete';

        const googleButton = document.createElement('button');
        googleButton.setAttribute('id', 'google-item');
        googleButton.textContent = 'Google It';

        const editButton = document.createElement('button');
        editButton.setAttribute('id', 'edit');
        editButton.textContent = 'Edit';

        tdActions.appendChild(addToCartButton);
        tdActions.appendChild(editButton);
        tdActions.appendChild(deleteButton);

        return tdActions;
    }
}
