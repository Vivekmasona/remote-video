const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve the upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('audioFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = `uploads/${req.file.originalname}`;
  io.emit('new-audio', filePath);
  res.send('File uploaded and clients notified.');
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
