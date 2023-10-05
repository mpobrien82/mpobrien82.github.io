import gspread
from google.oauth2 import service_account
import pandas as pd

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

# Specify the names of the sheets you want to fetch
sheet1_name = 'Dashboard'

# Call the fetch_data function with the specified sheet names to fetch the data as DataFrames
data_frame1 = fetch_data(sheet1_name)


# Print the first few rows of the DataFrames to verify the data
print("Data from Sheet 1:")
print(data_frame1.head())

