const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let currentVideoId = null;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New client connected');

    if (currentVideoId) {
        socket.emit('playVideo', currentVideoId);
    }

    socket.on('playVideo', (videoId) => {
        currentVideoId = videoId;
        io.emit('playVideo', videoId);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => console.log('Server is running on port 4000'));
