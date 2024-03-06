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
//io.on('connection', (socket) => {
//    console.log('A user connected');
//    socket.on('disconnect', () => {
//        console.log('User disconnected');
//   });
//});

io.on('connection', (socket) => {
    console.log('A user connected');
    // Immediately emit an event to this client
    socket.emit('update', { instName: 'Test', userName: 'TestUser', ipAddr: '127.0.0.1' });
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

app.get('/events', function(req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    // a function to send messages
    const sendUpdate = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    sendUpdate({ message: "Initial message" });

    // You could call sendUpdate whenever there's new data to send to the client
});


http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
