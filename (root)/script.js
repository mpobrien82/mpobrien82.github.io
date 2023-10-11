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
    const lines = csvData.split('\n');
    const playerTable = document.querySelector('#player-table');
    let team = '';
    let opponent = '';
    let pace = '';
    let rw = '';

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // Check for rows with team, opponent, pace, and rw/ww data
        if (line.includes('PACE')) {
            const data = line.split('\t');
            team = data[0];
            opponent = data[1];
            pace = data[2];
            rw = data[3];
        } else if (line) {
            // Add player data to the table cells, matching the players with their respective team
            const values = line.split('\t');
            const row = playerTable.insertRow();
            const cells = [team, opponent, pace, rw, ...values];

            for (let j = 0; j < cells.length; j++) {
                const cell = row.insertCell();
                cell.textContent = cells[j];
            }
        }
    }
}
