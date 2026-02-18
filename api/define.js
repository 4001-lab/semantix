import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { word, pageTitle, apiKey } = req.body;

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY });
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

    res.status(200).json({ content: response.text });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
}
