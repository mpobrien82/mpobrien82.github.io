<!DOCTYPE html>
<html>
<head>
    <title>Player Information</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #333; /* Dark background color */
            color: #fff; /* Text color */
        }
        .container {
            text-align: center;
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .scroll-container {
            flex: 1;
            max-height: 80vh;
            max-width: 95%;
            overflow-y: auto;
            overflow-x: auto;
        }
        #player-table {
            border-collapse: collapse;
            width: 100%;
        }
        #player-table th, #player-table td {
            padding: 8px;
            text-align: center;
            border: none;
            font-size: 24px;
        }
        #player-table thead th {
            position: sticky;
            top: 0;
            background-color: dark;
            z-index: 1;
        }
        .input-box {
            width: 100%;
            height: 40px;
            font-size: 18px;
        }
        /* Set a different color for the header text */
        .container h1 {
            color: #fff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Player Information</h1>
        <input type="file" id="file-input">
        <div class="scroll-container">
            <table id="player-table">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Opponent</th>
                        <th>Pace</th>
                        <th>RW/WW</th>
                        <th>Player</th>
                        <th>Minutes</th>
                        <th>Points</th>
                        <th>Assists</th>
                        <th>Rebounds</th>
                        <th>Threes</th>
                    </tr>
                </thead>
                <!-- Data will be inserted here dynamically -->
            </table>
        </div>
    </div>

    <script>
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

            // Extract team, opponent, pace, and rw/ww values from the table header
            const header = lines[0].split('\t');
            team = header[0];
            opponent = header[1];
            pace = header[2];
            rw = header[3];

            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();

                if (line) {
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
    </script>
</body>
</html>

