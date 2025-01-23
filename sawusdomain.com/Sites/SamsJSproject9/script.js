// define fooditem class
class FoodItem {
    constructor(name, price, quantity = 0) {
        this.name = name;
        this.price = price;
        this.selected = false; 
        this.quantity = quantity; 
    }
}

// define food items with their prices 
const foodItems = [
    new FoodItem("Pizza", 10),
    new FoodItem("Burger", 8),
    new FoodItem("Sushi", 15),
    new FoodItem("Salad", 6),
    new FoodItem("Pasta", 12)
];

// function to dynamically load food items
function loadFoodItems() {
    let foodItemsContainer = document.querySelector('.food-items');

    foodItems.forEach(item => {
        let label = document.createElement('label');
        let textField = document.createElement('input');
        textField.type = 'text';
        textField.name = 'quantity';
        textField.placeholder = 'Qty';
        textField.classList.add('quantity-input'); 
        textField.dataset.name = item.name; // store the item name in dataset for reference

        // create text node with item name and price
        let itemText = document.createTextNode(`${item.name} - $${item.price} `);
        
        label.appendChild(textField);
        label.appendChild(itemText); // append the name and price
        label.appendChild(document.createElement('br'));
        foodItemsContainer.appendChild(label);

        // event listener to update item quantity when text field value changes
        textField.addEventListener('input', function () {
            const itemName = this.dataset.name;
            const quantity = parseInt(this.value) || 0; // parse quantity as integer, default to 0 if NaN
            const selectedItem = foodItems.find(item => item.name === itemName);
            if (selectedItem) {
                selectedItem.quantity = quantity; // update the quantity of the corresponding fooditem object
                selectedItem.selected = quantity > 0; // update the selected status based on the quantity
            }
        });
    });
}

// call the function to load food items when the page loads
window.addEventListener('load', loadFoodItems);

// function to calculate total price based on selected items
function calculateTotalPrice() {
    let totalPrice = 0;

    foodItems.forEach(item => {
        if (item.selected) {
            totalPrice += item.price * item.quantity; 
        }
    });

    return totalPrice;
}

function handleFormSubmission(event) {
    event.preventDefault();

    // calculate total price based on selected items
    let totalPrice = calculateTotalPrice();

    // get selected items along with their quantities
    let selectedItemsWithQuantities = foodItems
        .filter(item => item.selected && item.quantity) // filter out non-selected or items without quantity
        .map(item => `${item.name}=${item.quantity}`); // map each item to a string in the format "itemName=quantity"

    let toField = document.getElementById('toField').value;
    let fromField = document.getElementById('fromField').value;
    let messageArea = document.getElementById('messageArea').value;

    // construction of the query string
    let queryString = `totalPrice=${totalPrice}&${selectedItemsWithQuantities.join('&')}&to=${encodeURIComponent(toField)}&from=${encodeURIComponent(fromField)}&message=${encodeURIComponent(messageArea)}`;

    // redirect to another page with the query string
    window.location.href = `shoppingCart.html?${queryString}`;
}

// listen for submit button click
document.querySelector('.submit-btn').addEventListener('click', handleFormSubmission);
