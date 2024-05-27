const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

let iframeUrl = '';

app.post('/update-url', (req, res) => {
    iframeUrl = req.body.url;
    io.emit('urlUpdated', { url: iframeUrl }); // Broadcast updated URL to all clients
    res.json({ status: 'URL updated' });
});

app.get('/current-url', (req, res) => {
    res.json({ url: iframeUrl });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle control panel events
    socket.on('play', () => {
        // Implement play logic
        // For example: emit 'play' event to all clients to start playback
        io.emit('play');
    });

    socket.on('pause', () => {
        // Implement pause logic
        // For example: emit 'pause' event to all clients to pause playback
        io.emit('pause');
    });

    // Handle other control events (volume control, mute, forward, etc.)
    // Example:
    // socket.on('volumeChange', (volume) => {
    //     io.emit('volumeChange', volume);
    // });

    // socket.on('forward', () => {
    //     io.emit('forward');
    // });
});
