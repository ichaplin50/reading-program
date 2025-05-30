#!/bin/bash

# Print a welcome message
echo "Starting Bookaroo game server..."
echo "Once the server starts, open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"

# Start the Python HTTP server
python3 -m http.server 8000 