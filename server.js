const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Plyr = require('plyr');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/plyr', express.static(path.join(__dirname, 'node_modules', 'plyr', 'dist')));

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('playVideo', (videoUrl) => {
        io.emit('playVideo', videoUrl);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
