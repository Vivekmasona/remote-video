const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let iframeUrl = '';

app.post('/update-url', (req, res) => {
    iframeUrl = req.body.url;
    res.json({ status: 'URL updated' });
});

app.get('/current-url', (req, res) => {
    res.json({ url: iframeUrl });
});

// New endpoints for controlling the audio player
app.post('/play', (req, res) => {
    // Code to play audio
    res.json({ status: 'Playing' });
});

app.post('/pause', (req, res) => {
    // Code to pause audio
    res.json({ status: 'Paused' });
});

app.post('/stop', (req, res) => {
    // Code to stop audio
    res.json({ status: 'Stopped' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

