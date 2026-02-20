import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // ✅ Always set CORS headers FIRST
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );

  // ✅ Handle preflight immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { word, pageTitle, apiKey } = req.body;

    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey || process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `In the context of "${pageTitle}", provide:
1. Word: ${word}
2. Category: (noun/verb/adjective/etc)
3. Meaning: (one contextual definition)
4. Synonyms: (4 words)
5. Antonyms: (4 words)
6. Usage: (one example sentence)

Format exactly as shown.`
    });

    return res.status(200).json({ content: response.text });

  } catch (error) {
    console.error('Server error:', error);

    return res.status(500).json({
      error: error.message || 'Internal Server Error'
    });
  }
}