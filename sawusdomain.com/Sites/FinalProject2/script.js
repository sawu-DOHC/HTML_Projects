////////////////////////////////// Define necessary classes ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
class FoodItem {
    constructor(newName, newPrice, newQuantity) {
        this.name = newName;
        this.price = newPrice;
        this.quantity = newQuantity;
    }
}

class User {
    constructor(newFirstName, newLastName, newBillingStreetAddress, newBillingCity, newBillingState, newBillingZipCode, newShippingStreetAddress, newShippingCity, newShippingState, newShippingZipCode) {
        this.firstName = newFirstName;
        this.lastName = newLastName;

        this.billingStreetAddress = newBillingStreetAddress;
        this.billingCity = newBillingCity;
        this.billingState = newBillingState;
        this.billingZipCode = newBillingZipCode;

        this.foodItems = [];

        this.shippingStreetAddress = newShippingStreetAddress;
        this.shippingCity = newShippingCity;
        this.shippingState = newShippingState;
        this.shippingZipCode = newShippingZipCode;
    }

    getTotal() {
        // Calculate total
        let total = 0;
        for (let i = 0; i < this.foodItems.length; i++) {
            total += this.foodItems[i].price * this.foodItems[i].quantity;
        }
        return total;
    }
}

// Create food objects and a user
let foodItems = [
    new FoodItem("Thin Mints", 3.50, 0),
    new FoodItem("Do Si Do’s", 3.50, 0),
    new FoodItem("Lemon Cremes", 3.50, 0),
    new FoodItem("Sand Dollars", 3.50, 0),
    new FoodItem("Chocolate Chip", 3.50, 0)
];




/////////////////////// Fill html page with available Cookie options //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function() {
    let cookiesFieldset = document.getElementById('cookiesFieldset');

    for (let i = 0; i < foodItems.length; i++) {
        let tempItem = foodItems[i];

        // Create Name Label
        const nameLabel = document.createElement('label');
        nameLabel.className = 'nameLabel';
        nameLabel.textContent = tempItem.name;

        // Create Checkbox element
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'checkBox';

        // Create labels for quantity fields
        let quantityLabel = document.createElement('label');
        quantityLabel.className = 'quantityLabel';
        quantityLabel.textContent = 'Quantity';

        // Create quantity fields
        let quantityField = document.createElement('input');
        quantityField.type = 'number'; 
        quantityField.className = 'quantityField';
        quantityField.min = '0'; 

        // Create labels for price
        let priceLabel = document.createElement('label');
        priceLabel.className = 'priceLabel';
        priceLabel.textContent = 'Price $';

        // Create price label
        let priceField = document.createElement('label');
        priceField.className = 'priceField';
        priceField.textContent = tempItem.price.toFixed(2);

        // Append created elements to the cookiesFieldset
        cookiesFieldset.appendChild(nameLabel);
        cookiesFieldset.appendChild(checkBox);
        cookiesFieldset.appendChild(quantityLabel);
        cookiesFieldset.appendChild(quantityField);
        cookiesFieldset.appendChild(priceLabel);
        cookiesFieldset.appendChild(priceField);
        cookiesFieldset.appendChild(document.createElement('br'));
    }
});

/////////////////////// Radio Button Functionality ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {

    const sameAddressRadio = document.getElementById('sameAddressRadio');

    const differentAddressRadio = document.getElementById('differentAddressRadio');

    const streetAddress2 = document.getElementById('streetAddress2');

    const city2 = document.getElementById('city2');

    const state2 = document.getElementById('state2');

    const zipCode2 = document.getElementById('zipCode2');

    // Same address case
    sameAddressRadio.addEventListener('change', function() {

        if (sameAddressRadio.checked) {

            // If "Use this address for shipping" is selected, copy values from the first set of fields
            const streetAddress = document.getElementById('streetAddress').value;
            const city = document.getElementById('city').value;
            const state = document.getElementById('state').value;
            const zipCode = document.getElementById('zipCode').value;

            // Populate the second set of fields with values from the first set
            streetAddress2.value = streetAddress;
            city2.value = city;
            state2.value = state;
            zipCode2.value = zipCode;

            // Disable the second set of fields
            streetAddress2.disabled = true;
            city2.disabled = true;
            state2.disabled = true;
            zipCode2.disabled = true;
        }
    });

    // Different address case
    differentAddressRadio.addEventListener('change', function() {
        if (differentAddressRadio.checked) {
            // Clears the fields if buttons are cycled 
            streetAddress2.value = '';
            city2.value = '';
            state2.value = '';
            zipCode2.value = '';

            // Enable the second set of fields
            streetAddress2.disabled = false;
            city2.disabled = false;
            state2.disabled = false;
            zipCode2.disabled = false;
        }
    });
});

/////////////////////// On submit ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    var submitButton = document.querySelector('.submitButton');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); 

        // Extract user data from form fields
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var billingStreetAddress = document.getElementById('streetAddress').value;
        var billingCity = document.getElementById('city').value;
        var billingState = document.getElementById('state').value;
        var billingZipCode = document.getElementById('zipCode').value;
        var shippingStreetAddress = document.getElementById('streetAddress2').value;
        var shippingCity = document.getElementById('city2').value;
        var shippingState = document.getElementById('state2').value;
        var shippingZipCode = document.getElementById('zipCode2').value;

        // Create a user object with shipping address based on the preference
        var user;
        if (document.getElementById('sameAddressRadio').checked) {
            user = new User(firstName, lastName, billingStreetAddress, billingCity, billingState, billingZipCode, billingStreetAddress, billingCity, billingState, billingZipCode);
        } 
        else {
            user = new User(firstName, lastName, billingStreetAddress, billingCity, billingState, billingZipCode, shippingStreetAddress, shippingCity, shippingState, shippingZipCode);
        }

        // Iterate through the checkboxes and quantity input fields in the cookiesFieldset
        var checkboxesArray = document.querySelectorAll('#cookiesFieldset .checkBox');
        var quantityFieldsArray = document.querySelectorAll('#cookiesFieldset .quantityField');

        for (let index = 0; index < checkboxesArray.length; index++) {
            const checkbox = checkboxesArray[index];
            const item = foodItems[index];
            const quantity = parseInt(quantityFieldsArray[index].value) || 0; // Get the quantity entered by the user

            // Update the quantity property of the FoodItem object
            item.quantity = quantity;

            // If the checkbox is checked and quantity is greater than 0, create a new FoodItem object with the updated quantity
            if (checkbox.checked && quantity > 0) {
                const foodItem = new FoodItem(item.name, item.price, quantity);
                user.foodItems.push(foodItem);
            }
        }

        // Calculate the total number of boxes ordered
        var totalBoxesOrdered = 0;
        for (const foodItem of user.foodItems) {
            totalBoxesOrdered += foodItem.quantity;
        }

        // Determine the shipping cost based on the total number of boxes ordered
        var shippingCost = 0;

        if (totalBoxesOrdered >= 10) {
            shippingCost = 0;
        } else {
            shippingCost = user.getTotal() * 0.05;
        }

        // Construct a string with the order details
        var orderDetailsString = "  ~ ORDER DETAILS ~\n";
        orderDetailsString += "Name: \n";
        orderDetailsString += "   " + user.firstName + ", " + user.lastName + "\n\n";
        orderDetailsString += "Billing Address:\n";
        orderDetailsString += "   Street Address: " + user.billingStreetAddress + "\n";
        orderDetailsString += "   City: " + user.billingCity + "\n";
        orderDetailsString += "   State: " + user.billingState + "\n";
        orderDetailsString += "   Zip: " + user.billingZipCode + "\n\n";
        orderDetailsString += "Shipping Address:\n";
        orderDetailsString += "   Street Address: " + user.shippingStreetAddress + "\n";
        orderDetailsString += "   City: " + user.shippingCity + "\n";
        orderDetailsString += "   State: " + user.shippingState + "\n";
        orderDetailsString += "   Zip: " + user.shippingZipCode + "\n\n";
        orderDetailsString += "Order Items:\n";

        for (let j = 0; j < user.foodItems.length; j++) {
            const foodItem = user.foodItems[j];
            orderDetailsString += "   " + (j + 1) + ". " + foodItem.name + " - Quantity: " + foodItem.quantity + "\n";
        }

        const subtotal = user.getTotal();
        const total = subtotal + shippingCost;

        // Display rounded values for shipping cost, subtotal, and total
        orderDetailsString += "\nShipping: $" + shippingCost.toFixed(2) + "\n";
        orderDetailsString += "Subtotal: $" + subtotal.toFixed(2) + "\n";
        orderDetailsString += "Total: $" + total.toFixed(2) + "\n";

        // Display the order details in the textarea
        const orderDetailsTextarea = document.getElementById('orderDetails');
        orderDetailsTextarea.value = orderDetailsString;

        console.log('User data:', user);
        console.log(user.getTotal());
    });

});
