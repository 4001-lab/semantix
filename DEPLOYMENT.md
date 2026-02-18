# Vercel Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Gemini API key from https://aistudio.google.com/app/apikey

## Deployment Steps

### 1. Prepare Your Repository

Ensure your project structure looks like this:
```
vocabLearner/
├── api/
│   └── define.js          # Vercel serverless function
├── backend/               # For local development only
├── content.js
├── manifest.json
├── popup.html
├── popup.js
├── package.json
└── .vercelignore
```

### 2. Deploy to Vercel

**Option A: Using Vercel Dashboard**
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure:
   - Framework Preset: Other
   - Root Directory: `./`
5. Add Environment Variable:
   - Name: `GEMINI_API_KEY`
   - Value: Your Gemini API key
6. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add GEMINI_API_KEY
```

### 3. Update Extension Configuration

After deployment, Vercel will give you a URL like `https://your-app.vercel.app`

1. Open `content.js`
2. Find line 9:
   ```javascript
   const API_URL = 'http://localhost:3000/api/define';
   ```
3. Replace with your Vercel URL:
   ```javascript
   const API_URL = 'https://your-app.vercel.app/api/define';
   ```
4. Save the file

### 4. Reload Extension

1. Go to `chrome://extensions/`
2. Click the reload icon on your Semantix extension
3. Test by double-clicking any word on a webpage

## Local Development

For local testing, use the Express server:

```bash
cd backend
npm install
npm start
```

Keep `API_URL` as `http://localhost:3000/api/define` in content.js

## API Key Options

Users can provide their API key in two ways:
1. **Extension Popup**: Click the extension icon and enter API key (stored locally)
2. **Environment Variable**: Set `GEMINI_API_KEY` in Vercel (fallback option)

## Troubleshooting

- **CORS errors**: The serverless function already includes CORS headers
- **API key errors**: Verify the environment variable is set in Vercel dashboard
- **Function timeout**: Vercel free tier has 10s timeout limit
- **Extension not working**: Check browser console for errors and verify API_URL is correct
