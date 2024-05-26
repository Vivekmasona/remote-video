const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const record = require('node-record-lpcm16');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let audioStream;
let isRecording = false;

function startRecording() {
  if (!isRecording) {
    audioStream = record.start({
      sampleRate: config.audio.sampleRate,
      threshold: config.audio.threshold,
      verbose: config.audio.verbose,
      recordProgram: config.audio.recordProgram
    });

    audioStream.on('data', (data) => {
      io.emit('audio', data);
    });

    isRecording = true;
    console.log('Recording started');
  }
}

function stopRecording() {
  if (isRecording) {
    record.stop();
    isRecording = false;
    console.log('Recording stopped');
  }
}

app.use(express.static('public'));

app.post('/start', (req, res) => {
  startRecording();
  res.send('Recording started');
});

app.post('/stop', (req, res) => {
  stopRecording();
  res.send('Recording stopped');
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

