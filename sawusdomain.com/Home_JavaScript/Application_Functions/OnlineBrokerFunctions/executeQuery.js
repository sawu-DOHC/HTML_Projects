async function executeQuery( queryString ) {

    const apiEndpoint = "https://sawusdomain.com/Home_PHP/key.php";
    const query = JSON.stringify({ query: queryString });

    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: query
        });

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();

        // Check if the data contains the required properties
        if (!data || typeof data !== 'object' || !data.data) {
            console.error("Invalid response structure:", data);
            return { data: [] }; // Return a consistent structure
        }

        return data;
    } catch (error) {
        console.error("Error in executeQuery:", error);
        return { data: [] }; // Return a consistent structure on error
    }
}
