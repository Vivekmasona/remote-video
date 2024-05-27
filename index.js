const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let command = '';
let audioUrl = '';

app.post('/send-command', (req, res) => {
    command = req.body.command;
    res.json({ status: 'Command received' });
});

app.post('/update-url', (req, res) => {
    audioUrl = req.body.url;
    res.json({ status: 'URL updated' });
});

app.get('/get-command', (req, res) => {
    res.json({ command });
});

app.get('/get-url', (req, res) => {
    res.json({ url: audioUrl });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

