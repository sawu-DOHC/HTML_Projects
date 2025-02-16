class Desktop {

    div_desktop;

    array_elements = [];


    constructor( ) {

        this.desktop = document.createElement('div');
        this.desktop.id = "desktop";
        document.body.appendChild(this.desktop);

        console.log("Desktop.constructor: created!");
 
    }

    initialize( json_data ) {

        // get all elements with parent id = 0 to populate the desktop div 
        for (let i = 0; i < json_data.length; i++) {

            if ( json_data[i].parent_id === "0" ) {

                this.array_elements.push( json_data[i] );  

            }
        }
        // append all the elements
        for (let i = 0; i < this.array_elements.length; i++) {


            switch ( this.array_elements[i].type ) {  
                case "dir": {
                    const newIcon = new Icon( this.array_elements[i] );  
                    this.desktop.appendChild( newIcon.element_icon );
                    break;
                }
                case "app": {
                    const newIcon = new Icon( this.array_elements[i] );  
                    this.desktop.appendChild( newIcon.element_icon );
                    break;
                }
                case "link": {
                    const newIcon = new Icon( this.array_elements[i] ); 
                    this.desktop.appendChild( newIcon.element_icon );
                    break;
                }
                default: {
                    console.log("Desktop.populateDesktop: unhandled case ");
                    break;
                }
            }
        
        }
    }
    
    

    
}
