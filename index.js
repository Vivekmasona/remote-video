const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let audioStatus = 'stop'; // Initial status of the audio player
let audioUrl = ''; // Initial URL of the audio

app.post('/control', (req, res) => {
    const { action } = req.body;
    
    // Update the audioStatus based on the action received
    if (action === 'play') {
        audioStatus = 'play';
    } else if (action === 'pause') {
        audioStatus = 'pause';
    } else if (action === 'stop') {
        audioStatus = 'stop';
    }

    res.json({ status: 'Button click received', action });
});

app.get('/audio-status', (req, res) => {
    res.json({ status: audioStatus });
});

app.post('/update-url', (req, res) => {
    const { url } = req.body;
    audioUrl = url;
    res.json({ status: 'URL updated' });
});

app.get('/current-url', (req, res) => {
    res.json({ url: audioUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

