// Wait for the DOM to be ready
$(document).ready(function() {
    $("#csvFileInput").change(handleFileSelect);
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            displayData(contents);
        };
        reader.readAsText(file);
    }
}

function displayData(csvData) {
    const table = $("#projectionsTable");
    table.empty(); // Clear previous data

    const lines = csvData.split("\n");
    const headers = lines[0].split("\t");
    let currentTeam = "";

    for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split("\t");
        if (data.length === headers.length) {
            const team = data[0];
            if (team !== currentTeam) {
                currentTeam = team;
                table.append(`<tr><th>Team: ${team}</th></tr>`);
                table.append(`<tr><th>Opponent</th><th>Pace</th><th>RW/WW</th><th>Player</th><th>Minutes</th><th>Points</th><th>Assists</th><th>Rebounds</th><th>Threes</th></tr>`);
            }
            table.append(`<tr><td>${data[1]}</td><td>${data[2]}</td><td>${data[3]}</td><td>${data[4]}</td><td>${data[5]}</td><td>${data[6]}</td><td>${data[7]}</td><td>${data[8]}</td><td>${data[9]}</td></tr>`);
        }
    }
}
