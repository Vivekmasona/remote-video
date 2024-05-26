const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const record = require('node-record-lpcm16');
const fs = require('fs');

// Read configuration from config.json
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Capture audio from the server's microphone using settings from config.json
const audioStream = record.start({
  sampleRate: config.audio.sampleRate,
  threshold: config.audio.threshold,
  verbose: config.audio.verbose,
  recordProgram: config.audio.recordProgram // Use 'sox' or 'rec' for macOS
});

audioStream.on('data', (data) => {
  io.emit('audio', data);
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(config.server.port, () => {
  console.log(`Listening on port ${config.server.port}`);
});

