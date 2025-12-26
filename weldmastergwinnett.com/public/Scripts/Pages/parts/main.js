document.addEventListener("DOMContentLoaded", function () {
    let menu = document.querySelector("#MenuSection");
    menu.classList.add("active");

    let saved = localStorage.getItem("cartItems");
    if (saved) {
        array_cartItems = JSON.parse(saved);
        updateCartTable();
    }
});
