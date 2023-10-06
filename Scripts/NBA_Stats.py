import gspread
from google.oauth2 import service_account
import pandas as pd
from flask import Flask, render_template_string

app = Flask(__name__)

def fetch_data(sheet_name):
    # Implement your code to fetch data from Google Sheets here
    # This function should return a pandas DataFrame
    pass

@app.route('/')
def display_data():
    sheet1_name = 'Dashboard'
    data_frame1 = fetch_data(sheet1_name)

    # Convert the DataFrame to an HTML table
    table_html = data_frame1.to_html(classes='table table-bordered table-hover', index=False)

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


