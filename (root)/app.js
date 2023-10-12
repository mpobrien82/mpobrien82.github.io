// Function to handle file input change
document.querySelector('#file-input').addEventListener('change', handleFileUpload);

// Get a reference to the pace input element
const paceInput = document.getElementById('pace-input');

// Add an event listener for changes to the pace input
paceInput.addEventListener('input', () => {
    // Get the current pace value
    const pace = parseFloat(paceInput.value);

    // Update player data when pace changes
    updatePlayerData(pace);
});

// Function to update player data based on the current pace
function updatePlayerData(pace) {
    // Get all player data elements
    const playerDataElements = document.querySelectorAll('.player-data');

    // Iterate through each player data element and update the calculated values
    playerDataElements.forEach((element) => {
        const originalValue = parseFloat(element.getAttribute('data-original-value'));
        const column = element.getAttribute('data-column');

        // Calculate and update the displayed value based on the pace
        if (column === 'Points' || column === 'Assists' || column === 'Rebounds' || column === 'Threes') {
            const newValue = (originalValue * pace).toFixed(2);
            element.textContent = newValue;
        }
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        // Handle the uploaded file, e.g., read and process the CSV data
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;

            // Process the CSV data (parse and create team sections)
            processDataFromCSV(csvData);
        };
        reader.readAsText(file);
    }
}

// Function to process data from the uploaded CSV
function processDataFromCSV(csvData) {
    // Parse and process the CSV data, then create team sections
    const lines = csvData.split('\n');
    const teamContainer = document.querySelector('#team-container');
    let currentTeamName = null;
    let teamSection = null;
    let playerTable = null;

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].trim().split(',');

        if (values.length >= 7) { // Ensure there are enough columns (removed RW/WW column)
            const teamName = values[0];

            if (teamName !== currentTeamName) {
                // Create a new team section
                teamSection = document.createElement('div');
                teamSection.classList.add('team-section');

                // Create a header for the team section
                const teamHeader = document.createElement('div');
                teamHeader.classList.add('team-header');
                teamSection.appendChild(teamHeader);

                // Add the team name to the header
                const teamNameElement = document.createElement('div');
                teamNameElement.classList.add('team-name');
                teamNameElement.textContent = teamName;
                teamHeader.appendChild(teamNameElement);

                // Create a div for the buttons
                const teamButtons = document.createElement('div');
                teamButtons.classList.add('team-buttons');
                teamHeader.appendChild(teamButtons);

                // Create the WW button
                const wwButton = document.createElement('div');
                wwButton.classList.add('team-button');
                wwButton.textContent = 'WW';
                teamButtons.appendChild(wwButton);

                // Create the RW button
                const rwButton = document.createElement('div');
                rwButton.classList.add('team-button');
                rwButton.textContent = 'RW';
                teamButtons.appendChild(rwButton);

                // Add click event listeners to the buttons
                wwButton.addEventListener('click', () => handleButtonClick(wwButton, rwButton));
                rwButton.addEventListener('click', () => handleButtonClick(rwButton, wwButton));

                // Create a table for the team
                playerTable = document.createElement('table');
                playerTable.id = 'player-table';
                playerTable.innerHTML = `
                    <thead>
                        <tr>
                            <th>Players</th>
                            <th>Minutes</th>
                            <th>Points</th>
                            <th>Assists</th>
                            <th>Rebounds</th>
                            <th>Threes</th>
                        </tr>
                    </thead>
                `;
                teamSection.appendChild(playerTable);

                // Add the team section to the container
                teamContainer.appendChild(teamSection);

                currentTeamName = teamName;
            }

            // Add player data to the team
            // Add player data to the team's table
            const row = playerTable.insertRow();
            for (let j = 1; j < values.length; j++) { // Start from index 1 to exclude Team
                const cell = row.insertCell();

                // Set the data-original-value and data-column attributes for player data elements
                let originalValue = values[j];
                let column = '';

                if (j >= 3 && j <= 6) {
                    column = ['Points', 'Assists', 'Rebounds', 'Threes'][j - 3];
                    originalValue = (parseFloat(originalValue) * parseFloat(values[2])).toFixed(2);
                }

                cell.textContent = originalValue;

                if (column) {
                    cell.classList.add('player-data');
                    cell.setAttribute('data-original-value', originalValue);
                    cell.setAttribute('data-column', column);
                }
            }
        }
    }
}

// Function to handle button clicks
function handleButtonClick(clickedButton, otherButton) {
    if (!clickedButton.classList.contains('active')) {
        clickedButton.classList.add('active');
        otherButton.classList.remove('active');
    }
}
