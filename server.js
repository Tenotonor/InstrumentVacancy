const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

// Serve static files from the root directory
app.use(express.static('.'));

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');
    // Emit an initial message to this client
    socket.emit('update', { instName: 'Initial', userName: 'TestUser', ipAddr: '127.0.0.1' });

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
    console.log('io.emit update called successfully');

    res.send('Data received successfully');
});

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
