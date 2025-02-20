class Row {

    string_itemId;
    string_category;
    string_description;
    string_partNumber;
    string_qoh;
    string_lastUpdated;

    constructor( itemId, category, description, partNumber, qoh, lastUpdated ) {
        this.string_itemId = itemId;
        this.string_category = category;
        this.string_description = description;
        this.string_partNumber = partNumber;
        this.string_qoh = qoh;
        this.string_lastUpdated = lastUpdated;

        const targetElement = document.querySelector(`#${this.string_category}-Folder tbody`);
        if (!targetElement) {
            console.error(`No folder found for category: ${this.string_category}`);
            return;
        }
        const tr = document.createElement('tr');
        tr.setAttribute('data-item-id', this.string_itemId);
        tr.setAttribute('id', 'row-' + this.string_itemId);
        tr.appendChild(this.createDescriptionCell());
        tr.appendChild(this.createPartNumberCell());
        tr.appendChild(this.createQOHCell());
        tr.appendChild(this.createLastUpdatedCell());
        tr.appendChild(this.createActionsCell());
        targetElement.appendChild(tr);
    }

    createDescriptionCell() {
        const td = document.createElement('td');
        td.classList.add('description');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.string_description;
        input.classList.add('description-input');
        input.disabled = true;
        td.appendChild(input);
        return td;
    }

    createPartNumberCell() {
        const td = document.createElement('td');
        td.classList.add('part-number');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = this.string_partNumber;
        input.classList.add('part-number-input');
        input.disabled = true;
        td.appendChild(input);
        return td;
    }

    createQOHCell() {
        const td = document.createElement('td');
        td.classList.add('qoh');
        const input = document.createElement('input');
        input.type = 'number';
        input.value = this.string_qoh;
        input.classList.add('qoh-input');
        input.disabled = true;
        td.appendChild(input);
        return td;
    }
    

    createLastUpdatedCell() {
        const td = document.createElement('td');
        td.classList.add('last-updated');
        td.textContent = this.string_lastUpdated;
        return td;
    }

    createActionsCell() {
        const td = document.createElement('td');
        td.classList.add('actions');
    
        const addButton = document.createElement('button');
        addButton.id = "add-to-cart";
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
            console.log('Add clicked', this.string_itemId, this.string_description, this.string_partNumber, this.string_qoh);
            cart.addItem(this.string_itemId, this.string_description, this.string_partNumber, this.string_qoh);
        });
        
        
    
        const editButton = document.createElement('button');
        editButton.id = "edit";
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', async () => {
            const row = editButton.closest('tr');
            const descriptionInput = row.querySelector('.description-input');
            const partNumberInput = row.querySelector('.part-number-input');
            const qohInput = row.querySelector('.qoh-input');
    
            if (editButton.textContent === "Edit") {
                descriptionInput.removeAttribute('disabled');
                partNumberInput.removeAttribute('disabled');
                qohInput.removeAttribute('disabled');
                editButton.textContent = "Save";
                editButton.id = "save-item";
            } else {
                const updatedDescription = descriptionInput.value;
                const updatedPartNumber = partNumberInput.value;
                const updatedQOH = qohInput.value;
                try {
                    await this.updateItem(this.string_itemId, updatedDescription, updatedPartNumber, updatedQOH);
                    console.log('Updated item:', this.string_itemId, updatedDescription, updatedPartNumber, updatedQOH);
                } catch (error) {
                    console.error('Error updating item:', error);
                }
                descriptionInput.setAttribute('disabled', 'true');
                partNumberInput.setAttribute('disabled', 'true');
                qohInput.setAttribute('disabled', 'true');
                editButton.textContent = "Edit";
                editButton.id = "edit";
            }
        });
    
        const deleteButton = document.createElement('button');
        deleteButton.id = "delete-item";
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            try {
                await this.deleteItem(this.string_itemId);
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        });
    
        td.appendChild(addButton);
        td.appendChild(editButton);
        td.appendChild(deleteButton);
        return td;
    }
    

    async updateItem( itemId, description, partNumber, qoh ) {

        const url = 'https://sawusdomain.com/Sites/InventoryDatabaseApp/PHP/update.php';

        const data = { itemId, description, partNumber, qoh };

        const response = await fetch(url, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )

        });

        const result = await response.json();

        console.log( result.message );

    }
    
    async deleteItem(itemId) {

        const url = 'https://sawusdomain.com/Sites/InventoryDatabaseApp/PHP/delete.php';

        const data = { itemId };

        const response = await fetch(url, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        });

        const result = await response.json();
        
        console.log(result.message);
    }
}
