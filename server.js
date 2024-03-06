const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // Allows access from any origin
    methods: ["GET", "POST"] // Allows only GET and POST requests
  }
});

const port = process.env.PORT || 8080;

// Middleware to solve CORS issues when your client is on a different origin
app.use(cors());

// Serve static files from the root directory
app.use(express.static('.'));

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('A user connected via Socket.IO');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Route for logging data and emitting updates to all connected clients
app.get('/log', (req, res) => {
    const { instName, userName, ipAddr } = req.query;
    console.log(`Received data: instName=${instName}, userName=${userName}, ipAddr=${ipAddr}`);

    // Emitting to all connected clients
    io.emit('update', { instName, userName, ipAddr });
    console.log('io.emit update called successfully with:', { instName, userName, ipAddr });

    res.send('Data received successfully');
});

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
