# Semantix - Chrome Extension

A minimal vocabulary learning extension that provides context-aware definitions using Google's Gemini AI.

## Features

- **Double-click any word** to get instant definitions
- **Context-aware**: Definitions are tailored to the current page topic
- **Comprehensive info**: Word category, meaning, synonyms, antonyms, and usage examples
- **Clean UI**: Simple modal popup with easy-to-read formatting

## Setup

1. **Get Gemini API Key**
   - Visit https://aistudio.google.com/app/apikey
   - Create a new API key

2. **Setup Backend**
   - Navigate to `backend` folder
   - Create `.env` file: `GEMINI_API_KEY=your_api_key`
   - Install dependencies: `npm install`
   - Start server: `npm start`

3. **Install Extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `vocabLearner` folder

## Usage

1. Ensure backend server is running on port 3000
2. Navigate to any webpage
3. Double-click any word (up to 15 characters)
4. View the contextual definition in the popup modal
5. Click the X or outside the modal to close

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main logic for word lookup
- `content.css` - Modal styling
- `popup.html` - Extension popup interface
- `backend/server.js` - Express server with Gemini API
- `backend/package.json` - Backend dependencies
