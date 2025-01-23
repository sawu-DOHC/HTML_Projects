const foodItems = [
    { name: "Pizza", price: 10 },
    { name: "Burger", price: 8 },
    { name: "Sushi", price: 15 },
    { name: "Salad", price: 6 },
    { name: "Pasta", price: 12 }
];


// function to parse query string
function parseQueryString(queryString) {
    const params = {};
    queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
}
// extract query string from URL
const queryString = window.location.search.substring(1);
const params = parseQueryString(queryString);

// display receipt as a table
const receiptTable = document.getElementById('receipt');
const tbody = receiptTable.querySelector('tbody');
const totalCostCell = document.getElementById('totalCost');
const totalPrice = parseFloat(params.totalPrice).toFixed(2);
const selectedItemsWithQuantities = Object.entries(params)
    .filter(([key, value]) => key !== 'totalPrice' && key !== 'to' && key !== 'from' && key !== 'message')
    .map(([itemName, quantity]) => ({ itemName, quantity }));

let totalCost = 0;

// function to create table rows for each selected item
function createTableRow(itemName, quantity) {
    const row = document.createElement('tr');

    // create product name cell
    const itemNameCell = document.createElement('td');
    itemNameCell.textContent = itemName;
    row.appendChild(itemNameCell);

    // create quantity cell
    const quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;
    row.appendChild(quantityCell);

    // calculate cost based on item price and quantity
    const item = foodItems.find(item => item.name === itemName);
    const itemCost = item ? item.price * quantity : 0;

    // create cost cell
    const costCell = document.createElement('td');
    costCell.textContent = `$${itemCost.toFixed(2)}`;
    row.appendChild(costCell);

    return row;
}


// iterate over selected items and display them
selectedItemsWithQuantities.forEach(({ itemName, quantity }) => {
    const row = createTableRow(itemName, quantity);
    tbody.appendChild(row);
    totalCost += foodItems.find(item => item.name === itemName).price * quantity;
});

// display total cost
totalCostCell.textContent = `$${totalCost.toFixed(2)}`;

// insert message into the message container
const messageContainer = document.getElementById('messageContainer');
messageContainer.innerHTML = `
    <h2>Greeting Message</h2>
    <p>To: ${params.to}</p>
    <p>From: ${params.from}</p>
    <p>Message: ${params.message}</p>
`;