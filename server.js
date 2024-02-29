const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Setup socket.io with the server

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Store instruments data
let instruments = {};

// Serve the main page
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(__dirname + '/index.html');
});

// Serve the JavaScript file
app.get('/script.js', (req, res) => {
    console.log('Serving script.js');
    res.sendFile(__dirname + '/script.js');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    // Emit current instruments data to just connected client
    socket.emit('update', instruments);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Handle data from C# client
app.post('/log', (req, res) => {
    console.log('Received POST request to /log with data:', req.body);

    const { instName, userName, ipAddr } = req.body;
    if (!instName || !userName || !ipAddr) {
        console.error('Missing data in request:', req.body);
        return res.status(400).json({ error: 'Missing data in request' });
    }

    // Assuming instName is unique for each instrument/client
    const key = instName;

    // Update or add the instrument data
    instruments[key] = {
        userName,
        ipAddr,
        lastUpdated: new Date().toISOString() // Adding a timestamp for the last update
    };

    console.log(`Updated instruments data: ${JSON.stringify(instruments)}`);

    // Emit updated instruments data to all clients
    io.emit('update', instruments);

    res.json({ message: 'Data received successfully', data: req.body });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
