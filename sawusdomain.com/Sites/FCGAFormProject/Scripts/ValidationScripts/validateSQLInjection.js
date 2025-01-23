function validateSQLInjection( isFormValid ) {

    // array of sql keywords to check
    const sqlKeywords_array = [ "SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "DISTINCT", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "DATABASE", "VIEW", "INDEX", "ALTER", "ADD", "DROP", "TRUNCATE", "COLUMN", "CONSTRAINT", "GRANT", "REVOKE", "BEGIN", "COMMIT", "ROLLBACK", "SAVEPOINT", "SET TRANSACTION", "INNER JOIN","LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN", "AND", "OR", "NOT", "BETWEEN","LIKE", "IN", "IS NULL", "IS NOT NULL", "COUNT", "SUM", "AVG", "MIN", "MAX", "EXISTS", "ANY", "ALL", "AS", "UNION", "UNION ALL", "INTERSECT", "EXCEPT", "CASE", "WHEN", "THEN", "ELSE", "END", "PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "DEFAULT", "CHECK", "INT", "VARCHAR", "TEXT", "DATE", "TIMESTAMP", "BOOLEAN", "DECIMAL", "FLOAT", "CHAR", "BLOB"];

    // select all input and textarea fields
    const formFields_nodeList = document.querySelectorAll("input");

    // for each loop
    for (const field_element of formFields_nodeList) {

        // get the field value, convert to uppercase, and trim whitespace
        const fieldValue_string = field_element.value.toUpperCase().trim();

        // split the input into words using spaces or punctuation
        const fieldWords_array = fieldValue_string.split(/[\s,]+/);

        // for each loop
        for ( const word_string of fieldWords_array ) {

            // check for exact matches only
            if ( sqlKeywords_array.includes( word_string ) ) {

                // alert and flag sql keyword detection
                alert(`potential sql injection detected in field: "${field_element.name}" with value "${field_element.value}".`);
                return false;
            }
        }
    }

    // validation passed
    return true;
}


