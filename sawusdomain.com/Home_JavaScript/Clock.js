class Clock {

    element; 

    constructor() {

        this.element = document.createElement('div');
        this.element.id = 'clock'; 

        this.clockTime = document.createElement('span');
        this.clockTime.id = 'clock-time';  

        this.element.appendChild(this.clockTime);  

        setInterval(() => this.updateClock(), 1000);  
    }

    updateClock() {

        const date_object = new Date();

        let int_hours = date_object.getHours();  
        let int_minutes = date_object.getMinutes();
        let int_seconds = date_object.getSeconds(); 
        
        let string_ampm;
        let string_hours;
        let string_minutes;
        let string_seconds;
        let string_clockTime;  
    

        if ( int_hours >= 12 ) {
            string_ampm = 'PM';
        } 
        else {
            string_ampm = 'AM';
        }
    
        if ( int_hours > 12 ) {
            int_hours = int_hours - 12;
        } 
        else if ( int_hours === 0 ) {
            int_hours = 12;
        }
    
        if ( int_hours < 10 ) {
            string_hours = '0' + int_hours;
        } 
        else {
            string_hours = int_hours;
        }
    
        if ( int_minutes < 10 ) {
            string_minutes = '0' + int_minutes;
        } 
        else {
            string_minutes = int_minutes;
        }
    
        if ( int_seconds < 10 ) {
            string_seconds = '0' + int_seconds;
        } 
        else {
            string_seconds = int_seconds;
        }
    
        string_clockTime = `${string_hours}:${string_minutes}:${string_seconds} ${string_ampm}`;
    
        this.clockTime.textContent = string_clockTime;
    }
    
}
