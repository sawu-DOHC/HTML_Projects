function populateTableMethod(user_Object, partners_Array) {
    const tableBody_Element = document.getElementById("partners-data");


    tableBody_Element.innerHTML = "";



    const columnOrder_Array = ['Partner_ID', 'CompanyName', 'CompanyPhone', 'City', 'ZIPCode', 'ContactName', 'ContactTitle', 'ContactPhone', 'ContactEmail', 'PayRate', 'TIG', 'SprayTransfer', 'ShortCircuit', 'FluxCore', 'Stick', 'Other'];


    if (user_Object.hasPermissionMethod('admin') == true ) {
        columnOrder_Array.push('LastModified', 'User', 'IPAddress');
    }

    let rows_HTML = '';
    for (let i = 0; i < partners_Array.length; i++) {
        let row_Object = partners_Array[i];
        let cells_HTML = generateCellsHTML(row_Object, columnOrder_Array);
        rows_HTML += `<tr data-id="${row_Object['Partner_ID']}">${cells_HTML}</tr>`;
    }

    tableBody_Element.innerHTML = rows_HTML;
}

function generateCellsHTML(row_Object, columnOrder_Array) {
    let cells_HTML = '';
    for (let j = 0; j < columnOrder_Array.length; j++) {
        let column_String = columnOrder_Array[j];
        let cellValue_String = row_Object[column_String] !== undefined ? row_Object[column_String] : '';
        cells_HTML += `<td>${cellValue_String}</td>`;
    }
    return cells_HTML;
}
