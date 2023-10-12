// Function to handle button clicks
function handleButtonClick(clickedButton, otherButton) {
    if (!clickedButton.classList.contains('active')) {
        clickedButton.classList.add('active');
        otherButton.classList.remove('active');
    }
}

// Function to update calculated values based on "Minutes"
function updateCalculatedValues() {
    const playerTables = document.querySelectorAll('#player-table');

    playerTables.forEach((table) => {
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            const minutes = parseFloat(cells[1].textContent);

            for (let j = 2; j <= 5; j++) {
                // Columns to be multiplied: Points, Assists, Rebounds, Threes
                const originalValue = parseFloat(cells[j].textContent);
                cells[j].textContent = (originalValue * minutes).toFixed(2);
            }
        });
    });
}

// Initial call to calculate and update values
updateCalculatedValues();
