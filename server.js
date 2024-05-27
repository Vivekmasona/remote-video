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

io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('play', () => {
        // Handle play event
        console.log('Play event received');
        // Your play logic here
    });

    socket.on('pause', () => {
        // Handle pause event
        console.log('Pause event received');
        // Your pause logic here
    });

    socket.on('stop', () => {
        // Handle stop event
        console.log('Stop event received');
        // Your stop logic here
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
