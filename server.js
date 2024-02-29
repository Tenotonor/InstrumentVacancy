const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Setup socket.io with the server

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Store instruments data
let instruments = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
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

// Modified to handle data from C# client
app.post('/log', (req, res) => {
    const { instName, userName, ipAddr } = req.body; // Adjust these fields based on your actual C# client data
    const key = instName; // Assuming instName is unique for each instrument/client

    // Update or add the instrument data
    instruments[key] = {
        userName,
        ipAddr,
        lastUpdated: new Date().toISOString() // Adding a timestamp for the last update
    };

    // Emit updated instruments data to all clients
    io.emit('update', instruments);

    res.json({ message: 'Data received successfully', data: req.body });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
