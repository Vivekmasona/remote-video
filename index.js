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

app.post('/control', (req, res) => {
    const { action } = req.body;
    // Here, you can handle different actions like 'play', 'pause', 'stop'
    // Depending on the action, you can update the state of the audio player
    // For now, let's just log the action received
    console.log('Button clicked:', action);
    res.json({ status: 'Button click received', action });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

