class System {

    json_data;

    object_pane;
    object_desktop;
    object_taskbar;
    

    constructor() {

        this.array_srcObj = [];

        this.object_pane = new Pane();
        this.object_desktop = new Desktop();
        this.object_taskbar = new Taskbar();

        // inject https://sawusdomain.com/Home_JavaScript/Base.css

    }

    async initialize() {

        console.log("System starting");

        try {
            const response = await fetch('https://sawusdomain.com/Home_PHP/fetch_resources.php');
    
            if ( response.status !== 200 ) {
                
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
    
            const json_response = await response.json();

            this.json_data = json_response.data;
            
    
        } 
        catch ( error ) {

            console.error("System.Initialize(): Error during initialization", error);

        }

        this.object_desktop.initialize( this.json_data );
        this.object_taskbar.initializeProgramsMenu ();

        console.log("System ready.");
    }
    async fetchJson() {
        const url = 'https://sawusdomain.com/Home_PHP/fetch_resources.php';
        try {
            const response = await fetch(url);
            const result = await response.json();
            return result.success ? result.data : [];
        } 
        catch ( error ) {
            console.error("Error fetching JSON:", error);
            return [];
        }
    }
    openDirectory( element  ) {

        this.object_pane.insertWindow( element , this.json_data );

        this.object_taskbar.insertTask( element );
        
    }

    async openApplication(element) {
        this.object_pane.insertWindow(element, this.json_data);  
        this.object_taskbar.insertTask(element);
    
        try {

            if (element.css_path) {
                await this.insertStylesheet(element.css_path, `style-${element.id}`);
                console.log(`CSS loaded from ${element.css_path}`);
            }
    

            if (element.ui_script) {
                await this.insertScript(element.ui_script, `interface-${element.id}`);
                console.log(`UI script loaded from ${element.ui_script}`);
            }
    

            if (element.controller_script) {
                await this.insertScript(element.controller_script, `controller-${element.id}`);
                console.log(`Controller script loaded from ${element.controller_script}`);
            }
    
        } catch (error) {
            console.error("System.openApplication: error loading scripts or something look at the scripts", error);
        }
    }

    async insertStylesheet(hypertextReference, identifier) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = hypertextReference;
            link.id = identifier;
            link.onload = () => {
                resolve();
                console.log(`${hypertextReference} has been added to the document.`);
            };
            link.onerror = () => reject(new Error(`Failed to load stylesheet from ${hypertextReference}`));
            document.head.appendChild(link);
        });
    }
    

    async insertScript(source, identifier) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = source;
            script.defer = true; 
            script.id = identifier;
            script.onload = () => {
                resolve();
                console.log(`${source} has been added to the document.`);
            };
            script.onerror = () => reject(new Error(`Failed to load script from ${source}`));
            document.head.appendChild(script);
        });
    }
    
    
    openLink( element ) {
        if ( element.url ) {

            window.open( element.url, '_blank' );
        } 
        else {
            console.log("System.openLink(): link element does not have a valid URL.");
        }
    }

    
    
}
