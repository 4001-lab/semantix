import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/define', async (req, res) => {
  const { word, pageTitle } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `In the context of "${pageTitle}", provide:
1. Word: ${word}
2. Category: (noun/verb/adjective/etc)
3. Meaning: (one contextual definition)
4. Synonyms: (4 words)
5. Antonyms: (4 words)
6. Usage: (one example sentence)

Format exactly as shown.`
        }]
      })
    });

    const data = await response.json();
    res.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
