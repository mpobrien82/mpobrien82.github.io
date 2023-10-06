import gspread
from google.oauth2 import service_account
import pandas as pd
from flask import Flask, render_template_string

app = Flask(__name__)

# Define the path to your Google Sheets API credentials JSON file
# Replace 'your-credentials.json' with the actual path to your JSON file
credentials_path = 'file:///C:/Users/mpobr/Downloads/nba-player-prop-model-fcab08224af6.json'

def fetch_data(sheet_name):
    try:
        # Authenticate with Google Sheets using service account credentials
        creds = service_account.Credentials.from_service_account_file(credentials_path)
        client = gspread.authorize(creds)

        # Open the Google Sheets document by name
        spreadsheet = client.open('2023 NBA Player Prop model')

        # Open the specific sheet named "Dashboard"
        sheet = spreadsheet.worksheet(sheet_name)

        # Get all values from the sheet and convert to a DataFrame
        data = sheet.get_all_values()
        headers = data[0]
        rows = data[1:]
        df = pd.DataFrame(rows, columns=headers)

        return df
    except Exception as e:
        print(f"Error fetching data: {str(e)}")
        return None

@app.route('/')
def display_data():
    sheet1_name = 'Dashboard'
    data_frame1 = fetch_data(sheet1_name)

    if data_frame1 is not None:
        # Convert the DataFrame to an HTML table
        table_html = data_frame1.to_html(classes='table table-bordered table-hover', index=False)
    else:
        # Handle the case where data couldn't be fetched
        table_html = "<p>Error fetching data</p>"

    # HTML template for your static website
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>My Static Website</title>
        <style>
            /* Add any CSS styling here */
        </style>
    </head>
    <body>
        <h1>Data from Google Sheets</h1>
        {{ table_html | safe }}
    </body>
    </html>
    """

    # Render the template with the data
    rendered_template = render_template_string(html_template, table_html=table_html)

    return rendered_template

if __name__ == '__main__':
    app.run(debug=True)



