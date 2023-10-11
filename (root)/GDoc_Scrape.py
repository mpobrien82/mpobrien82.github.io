import gspread
from google.oauth2 import service_account
import pandas as pd
from flask import Flask, render_template

app = Flask(__name__)

def fetch_and_process_data(sheet_name):
    # Set up Google Sheets API credentials
    credentials = service_account.Credentials.from_service_account_file(
        'C:/Users/mpobr/Downloads/nba-player-prop-model-fcab08224af6.json',
        scopes=["https://www.googleapis.com/auth/spreadsheets"]
    )

    # Authenticate with the Google Sheets API using the credentials
    gc = gspread.Client(auth=credentials)

    # URL of your Google Sheets document
    url = 'https://docs.google.com/spreadsheets/d/1SwQJeR8mxvJS31wgYs4gY7h6OUuP7Ogk2Mi9c-gb2v4/edit#gid=700047262'

    # Open the specific sheet by URL
    doc = gc.open_by_url(url)

    # Select the specific worksheet by title (using the specified sheet_name)
    worksheet = doc.worksheet(sheet_name)

    # Retrieve data from the worksheet
    data = worksheet.get_all_values()

    # Convert the data to a Pandas DataFrame
    sheet_df = pd.DataFrame(data[1:], columns=data[0])

    # Calculate the stats based on minutes
    minutes_column = pd.to_numeric(sheet_df['Minutes'], errors='coerce')
    sheet_df['Points'] = pd.to_numeric(sheet_df['Points'], errors='coerce') * minutes_column
    sheet_df['Assists'] = pd.to_numeric(sheet_df['Assists'], errors='coerce') * minutes_column
    sheet_df['Rebounds'] = pd.to_numeric(sheet_df['Rebounds'], errors='coerce') * minutes_column
    sheet_df['Threes'] = pd.to_numeric(sheet_df['Threes'], errors='coerce') * minutes_column

    # Now 'sheet_df' contains the data with calculated stats
    return sheet_df

@app.route('/')
def index():
    sheet1_name = 'Dashboard'
    data_frame1 = fetch_and_process_data(sheet1_name)

    # Convert the DataFrame to an HTML table without escaping HTML entities
    table_html = data_frame1.to_html(classes='table table-bordered', index=False, escape=False)

    return render_template('index.html', table=table_html)

if __name__ == '__main__':
    app.run(debug=True)
