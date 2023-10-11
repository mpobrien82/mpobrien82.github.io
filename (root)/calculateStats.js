// Function to calculate and update player stats based on minutes
function calculateStats() {
    const playerTable = document.querySelector('#player-table');
    const rows = playerTable.querySelectorAll('tr');

    // Iterate through each row in the table (skip the header row)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');

        // Find the cell containing the player's minutes and the cells for Points, Assists, Rebounds, and Threes
        const minutesCell = cells[11]; // Adjust the index based on your table structure
        const pointsCell = cells[12];
        const assistsCell = cells[13];
        const reboundsCell = cells[14];
        const threesCell = cells[15];

        // Get the values
        const minutes = parseFloat(minutesCell.querySelector('input').value);
        const points = parseFloat(pointsCell.querySelector('input').value);
        const assists = parseFloat(assistsCell.querySelector('input').value);
        const rebounds = parseFloat(reboundsCell.querySelector('input').value);
        const threes = parseFloat(threesCell.querySelector('input').value);

        // Check if all values are valid numbers
        if (!isNaN(minutes) && !isNaN(points) && !isNaN(assists) && !isNaN(rebounds) && !isNaN(threes)) {
            // Calculate the new stats
            pointsCell.textContent = (points * minutes).toFixed(2);
            assistsCell.textContent = (assists * minutes).toFixed(2);
            reboundsCell.textContent = (rebounds * minutes).toFixed(2);
            threesCell.textContent = (threes * minutes).toFixed(2);
        }
    }
}

// Call the calculateStats function when the page loads
window.onload = calculateStats;
