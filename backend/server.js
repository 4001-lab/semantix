import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(cors());
app.use(express.json());

app.post('/api/define', async (req, res) => {
  const { word, pageTitle, apiKey } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `In the context of "${pageTitle}", provide:
1. Word: ${word}
2. Category: (noun/verb/adjective/etc)
3. Meaning: (one contextual definition)
4. Synonyms: (4 words)
5. Antonyms: (4 words)
6. Usage: (one example sentence)

Format exactly as shown.`
    });

    res.json({ content: response.text });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
