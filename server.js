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
app.use(express.static('public')); // Serve static files from 'public' directory

// Store instruments data
let instruments = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    // Emit current instruments data to just connected client
    socket.emit('update', instruments);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.post('/log', (req, res) => {
    const { instrumentName, userData } = req.body;
    instruments[instrumentName] = userData;

    // Emit updated instruments data to all clients
    io.emit('update', instruments);

    res.send('Data received successfully');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
