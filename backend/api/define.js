export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { word, pageTitle } = req.body;

    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }

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
    return res.status(200).json({ content: data.choices[0].message.content });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}