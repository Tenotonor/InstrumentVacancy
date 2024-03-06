const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Main page route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Log data route
app.get('/log', (req, res) => {
    const { instName, userName, ipAddr } = req.query;
    console.log(`Received data: instName=${instName}, userName=${userName}, ipAddr=${ipAddr}`);

    // Emit to all connected clients
    io.emit('update', { instName, userName, ipAddr });
    console.log(`io.emit update called successfully`);

    res.send('Data received successfully');
    console.log(`Data received successfully`);
});


http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
