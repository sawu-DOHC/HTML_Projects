class Session {
    // Declare variables with datatype prefixes
    array_studentIds = [];
    date_start;
    date_end;
    number_price;
    number_capacity;

    // Constructor to initialize variables
    constructor( startDate, endDate, price, capacity ) {
        this.date_start = startDate;
        this.date_end = endDate;
        this.number_price = price;
        this.number_capacity = capacity;
    }

    // Method to add a student to the session
    addStudent( studentId ) {
        if ( this.array_studentIds.length < this.number_capacity ) {

            this.array_studentIds.push(studentId);
            console.log(`Student ID ${studentId} added to the session.`);
        } 
        else {
            console.log("Session is full. Cannot add more students.");
        }
    }

    // Method to display session information
    displayInfo() {
        console.log(`Session from ${this.date_start} to ${this.date_end}`);
        console.log(`Price: $${this.number_price}`);
        console.log(`Capacity: ${this.number_capacity}`);
        console.log(`Registered Students: ${this.array_studentIds.length}/${this.number_capacity}`);
        console.log(`Student IDs: ${this.array_studentIds.join(', ')}`);
    }
}
