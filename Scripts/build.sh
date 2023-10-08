#!/bin/bash

# Create a virtual environment
python -m venv venv
source venv/bin/activate

# Install required Python packages
pip install -r requirements.txt

# Run your Python script
python Scripts/GDoc_Scrape.py

source venv/Scripts/activate  # On Windows
