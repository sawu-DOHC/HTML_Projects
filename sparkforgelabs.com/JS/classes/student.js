class Student {
    // Declare variables with datatype prefixes
    string_id;
    string_firstName;
    string_lastName;
    boolean_paid;

    // Static property to auto-generate unique student IDs
    static currentId = 1; // Start student IDs from 1

    // Constructor to initialize variables
    constructor(firstName, lastName, paid) {
        this.string_id = Student.currentId++; // Assign and increment the ID
        this.string_firstName = firstName;
        this.string_lastName = lastName;
        this.boolean_paid = paid;
    }

}
