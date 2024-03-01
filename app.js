const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Use the port specified by the environment or default to 8080

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the "Hello World" response
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

// Your previous functionality here
// For example, handling other routes, setting up socket.io, etc.

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});
