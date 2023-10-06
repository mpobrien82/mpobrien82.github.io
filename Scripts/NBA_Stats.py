from flask import Flask
import gspread
from google.oauth2 import service_account
import pandas as pd

app = Flask(__name__)

def fetch_data(sheet_name):
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

    # Now 'sheet_df' contains the data as a DataFrame
    return sheet_df

@app.route('/')
def index():
    # Specify the names of the sheets you want to fetch
    sheet1_name = 'Dashboard'

    # Call the fetch_data function with the specified sheet names to fetch the data as DataFrames
    data_frame1 = fetch_data(sheet1_name)

    # Convert the DataFrame to an HTML table (you can customize this as needed)
    html_table = data_frame1.to_html(classes="table table-bordered table-striped")

    # Render the HTML table as the web page
    return f"<html><body>{html_table}</body></html>"

if __name__ == '__main__':
    app.run()

