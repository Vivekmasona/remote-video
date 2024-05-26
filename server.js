// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Receive audio chunk from client and broadcast it to all clients
    socket.on('audioChunk', (chunk) => {
        io.emit('audioChunk', chunk);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

