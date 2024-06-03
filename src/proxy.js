import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/book/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const response = await fetch(`https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`);
    const content = await response.text();
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/proxy/:bookId', async (req, res) => { 
  const { bookId } = req.params;
  try {
    const response = await axios.get(`https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}-h.zip`, {
      responseType: 'arraybuffer' 
    });
    console.log(response);
    const data = Buffer.from(response.data, 'binary'); 
    res.set('Content-Type', 'application/octet-stream');
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
