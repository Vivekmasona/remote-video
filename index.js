const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let iframeUrl = '';
let playerState = 'stopped'; // Possible states: 'playing', 'paused', 'stopped'

app.post('/update-url', (req, res) => {
    iframeUrl = req.body.url;
    res.json({ status: 'URL updated' });
});

app.post('/control', (req, res) => {
    const command = req.body.command;
    if (['play', 'pause', 'stop'].includes(command)) {
        playerState = command;
        res.json({ status: `Player ${command}ed` });
    } else {
        res.status(400).json({ status: 'Invalid command' });
    }
});

app.get('/current-state', (req, res) => {
    res.json({ url: iframeUrl, state: playerState });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

