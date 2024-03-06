const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;

// Middleware
app.use(express.static('.'));

// Data storage for instruments
let instrumentsData = {};

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected via Socket.IO');

    // Send existing instruments data to the newly connected client
    socket.emit('initialData', instrumentsData);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Log data route
app.get('/log', (req, res) => {
    const { instName, userName, ipAddr } = req.query;

    // Update instruments data
    instrumentsData[instName] = { instName, userName, ipAddr };

    // Emit to all connected clients
    io.emit('update', { instName, userName, ipAddr });

    res.send('Data received successfully');
});

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
