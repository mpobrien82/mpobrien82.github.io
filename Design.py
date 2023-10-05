# Import necessary libraries
import os

# Define the HTML code for the webpage
html_code = """
<!DOCTYPE html>
<html>
<head>
    <title>NBA Live Betting Model</title>
    <script>
        // Function to calculate remaining minutes
        function calculateRemainingMinutes() {
            var quarter = document.querySelector('input[name="quarter"]:checked').value;
            var timeInput = document.getElementById('time').value;

            // Split the time input into minutes and seconds
            var timeParts = timeInput.split(":");
            var minutes = parseInt(timeParts[0], 10);
            var seconds = parseInt(timeParts[1], 10);

            // Calculate remaining minutes based on the selected quarter and time input
            var totalMinutesPerQuarter = 12;
            var remainingMinutes = (4 - quarter) * totalMinutesPerQuarter;

            // Subtract elapsed time in the current quarter
            if (quarter > 1) {
                remainingMinutes -= (minutes + seconds / 60);
            } else {
                remainingMinutes -= ((minutes + seconds / 60) - totalMinutesPerQuarter);
            }

            return remainingMinutes;
        }

        // Function to update player projections
        function updatePlayerProjections() {
            var remainingMinutes = calculateRemainingMinutes();

            // Replace the following lines with your logic to update player projections
            var playerAProjection = 30 - (remainingMinutes * 0.5); // Example calculation
            var playerBProjection = 20 - (remainingMinutes * 0.4); // Example calculation

            // Display updated projections on the webpage
            document.getElementById('playerAProjection').textContent = playerAProjection.toFixed(2);
            document.getElementById('playerBProjection').textContent = playerBProjection.toFixed(2);
        }
    </script>
</head>
<body>
    <h1>NBA Live Betting Model</h1>
    <h2>Game State</h2>
    <label for="quarter1">1st Quarter</label>
    <input type="radio" id="quarter1" name="quarter" value="1">
    <label for="quarter2">2nd Quarter</label>
    <input type="radio" id="quarter2" name="quarter" value="2">
    <label for="quarter3">3rd Quarter</label>
    <input type="radio" id="quarter3" name="quarter" value="3">
    <label for="quarter4">4th Quarter</label>
    <input type="radio" id="quarter4" name="quarter" value="4">
    <br>

    <label for="time">Time Left (MM:SS):</label>
    <input type="text" id="time" placeholder="Enter time left (MM:SS)">
    <button onclick="updatePlayerProjections()">Update Projections</button>

    <h2>Player Projections</h2>
    <p>Player A Projection: <span id="playerAProjection">-</span></p>
    <p>Player B Projection: <span id="playerBProjection">-</span></p>
</body>
</html>
"""

# Specify the path to the HTML file in your GitHub repository
html_file_path = "path/to/your/index.html"

# Write the HTML code to the specified HTML file
with open(html_file_path, "w") as html_file:
    html_file.write(html_code)

# Push the changes to your GitHub repository using Git commands
os.system(f"git add {html_file_path}")
os.system(f'git commit -m "Update HTML code for NBA live model"')
os.system("git push")
