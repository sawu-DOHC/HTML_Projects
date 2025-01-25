class SrcObj {

    string_id;
    string_parent_id;
    string_type;
    string_name;
    string_description;
    string_img_path;
    string_url;
    string_body_content;
    string_css_path;
    
// db structure =     id,     parent_id,     type,     name,     description,   image_path,     url       ,     body_content       , css_path        )
    constructor ( new_id, new_parent_id, new_type, new_name, new_description, new_img_path, new_url = null, new_body_content = null, new_css_path    ) {

        this.string_id = new_id; 
        this.string_parent_id = new_parent_id; 
        this.string_type = new_type; 
        this.string_name = new_name;
        this.string_description = new_description; 
        this.string_img_path = new_img_path; 
        this.string_url = new_url; 
        this.string_body_content = new_body_content; 
        this.string_css_path = new_css_path;

    }

}

