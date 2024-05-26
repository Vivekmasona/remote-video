// api/play.js

const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const { query } = req;
  const url = query.url;

  try {
    if (!url || !ytdl.validateURL(url)) {
      throw new Error('Invalid YouTube URL');
    }

    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);
    ytdl(url, {
      format: audioFormat
    }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

