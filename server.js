const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/play', async (req, res) => {
  const url = req.query.url;
  
  try {
    if (!ytdl.validateURL(url)) {
      throw new Error('Invalid YouTube URL');
    }
    
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    
    res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
    ytdl(url, {
      format: audioFormat
    }).pipe(res);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

