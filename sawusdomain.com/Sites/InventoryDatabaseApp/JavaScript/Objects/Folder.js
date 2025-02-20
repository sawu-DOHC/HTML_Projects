class Folder {

    string_category;
    element_folder;
    element_table;
    element_tableHead;
    element_tableBody;
    element_navTab;

    constructor( string_category ) {

        this.string_category = string_category;
        this.element_folder = document.createElement('div');
        this.element_folder.id = string_category + "-Folder";
        this.element_folder.classList.add("folder");

        this.element_folder.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th class="description">Description</th>
                        <th class="part-number">Part Number</th>
                        <th class="qoh">QOH</th>
                        <th class="last-updated">Updated</th>
                        <th class="actions">Actions</th>
                    </tr>
                </thead>
                <tbody id="${string_category}-Table">
                </tbody>
            </table>
        `;

        this.element_table = this.element_folder.querySelector("table");
        this.element_tableHead = this.element_folder.querySelector("thead");
        this.element_tableBody = this.element_folder.querySelector("tbody");

        this.element_navTab = document.createElement('div');
        this.element_navTab.classList.add('tab');
        this.element_navTab.textContent = string_category;
        this.element_navTab.setAttribute('onclick', "showFolder('" + string_category + "')");

        const navElement = document.querySelector('nav');
        navElement.appendChild(this.element_navTab);

        const mainElement = document.querySelector('main');

        mainElement.appendChild( this.element_folder );
        
    }

    
}
