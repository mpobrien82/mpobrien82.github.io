// Function to handle file input change
document.querySelector('#file-input').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        // Clear the existing table
        clearTable();

        // Handle the uploaded file, e.g., read and process the CSV data
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;

            // Process the CSV data (parse and update the table)
            processDataFromCSV(csvData);
        };
        reader.readAsText(file);
    }
}

// Function to clear the existing table
function clearTable() {
    const playerTable = document.querySelector('#player-table');
    while (playerTable.rows.length > 1) {
        playerTable.deleteRow(1);
    }
}

// Function to process data from the uploaded CSV
function processDataFromCSV(csvData) {
    // Parse and process the CSV data, then update the table
    const lines = csvData.split('\n').map(line => line.split('\t'));
    const playerTable = document.querySelector('#player-table');

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i];

        // Add player data to the table cells
        const row = playerTable.insertRow();

        for (let j = 0; j < values.length; j++) {
            const cell = row.insertCell();
            cell.textContent = values[j];
        }
    }
}
