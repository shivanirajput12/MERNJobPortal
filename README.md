# Backend README

This README lists the main components and features used in the `index.js` file for quick understanding:

## Main Components Used
- **Express**: Used to create the web server.
- **Cookie Parser**: Helps read cookies from requests.
- **Body Parser**: Helps read data sent in requests (not used directly).
- **CORS**: Allows your frontend to talk to the backend.

## Key Features in index.js
- **Express App Initialization**: Starts the server.
- **Route Setup**: Adds a `/home` endpoint for a welcome message.
- **JSON Body Parsing Middleware**: Lets the server read JSON data.
- **URL-Encoded Body Parsing Middleware**: Lets the server read form data.
- **Cookie Parsing Middleware**: Lets the server read cookies.
- **CORS Configuration and Middleware**: Allows requests from your frontend.
- **Port Definition**: Sets the port for the server.
- **Server Listening and Logging**: Starts the server and shows a message.


