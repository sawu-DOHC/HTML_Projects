class Icon {

    element_icon;
    string_div_id;

    string_src_id;
    string_parent_id;

    float_width;
    float_height;

    string_name;
    string_img_path;
    string_url;
    string_description;

    
    constructor( element ) {

        this.string_div_id = `icon-${element.id}`;  
        this.string_src_id = element.id;
        this.string_parent_id = element.parent_id;  

        this.string_name = element.name;
        this.string_img_path = element.image_path;
        this.string_url = element.url;
        this.string_description = element.description;

        this.element_icon = document.createElement("div");
        this.element_icon.id = this.string_div_id;
        this.element_icon.className = "icon";

 
        this.element_icon.setAttribute('src_id', this.string_src_id);
        this.element_icon.setAttribute('parent_id', this.string_parent_id);  
        

        const img = document.createElement("img");
        img.src = this.string_img_path;
        this.element_icon.appendChild(img);


        const h2 = document.createElement("h2");
        h2.textContent = this.string_name;
        this.element_icon.appendChild(h2);

        img.addEventListener( "click", () => this.handleIconClick( this.element_icon.id ) );
    }

    handleIconClick() {

        const element = system.json_data.find( obj => obj.id === this.string_src_id );
    
        if ( element ) {

            switch ( element.type ) {  
                case "dir":
                    system.openDirectory( element );
                    break;
                
                case "app":
                    system.openApplication( element );  
                    break;
                
                case "link":
                    system.openLink( element );  
                    break;
        
                default:
                    console.log( "Unhandled icon click type:", element.type );
                    break;
            }
        } 
        else {
            console.error( "element not found for id:", this.string_src_id );
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    



    

}
