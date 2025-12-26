function submitItem() {
    const formEl = document.getElementById("FormAddItem");

    const desc = document.getElementById("new_description").value;
    const part = document.getElementById("new_part_number").value;
    const qoh  = document.getElementById("new_qoh").value;
    const cat  = document.getElementById("new_category").value;

    const formData = new FormData();
    formData.append("description", desc);
    formData.append("part_number", part);
    formData.append("quantity_on_hand", qoh);
    formData.append("category", cat);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "Scripts/Interface/POST_item.php", true);

    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("Server error.");
            return;
        }

        let res;
        try {
            res = JSON.parse(xhr.responseText);
        } 
        catch {
            alert("Invalid server response.");
            return;
        }

        if (!res.success) {
            alert("Error: " + res.error);
            return;
        }

        document.querySelector("#InventoryTable tbody")
            .insertAdjacentHTML("beforeend", res.newRowHtml);

        formEl.reset();

        alert("Item added successfully.");
    };

    xhr.send(formData);
}
