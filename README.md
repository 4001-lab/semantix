# Vocab Learner - Chrome Extension

A minimal vocabulary learning extension that provides context-aware definitions using OpenAI's GPT-3.5.

## Features

- **Double-click any word** to get instant definitions
- **Context-aware**: Definitions are tailored to the current page topic
- **Comprehensive info**: Word category, meaning, synonyms, antonyms, and usage examples
- **Clean UI**: Simple modal popup with easy-to-read formatting

## Setup

1. **Get OpenAI API Key**
   - Visit https://platform.openai.com/api-keys
   - Create a new API key

2. **Configure Extension**
   - Open `content.js`
   - Replace `YOUR_OPENAI_API_KEY` with your actual API key

3. **Install Extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `vocabLearner` folder

## Usage

1. Navigate to any webpage
2. Double-click any word (up to 15 characters)
3. View the contextual definition in the popup modal
4. Click the X or outside the modal to close

## Security Note

⚠️ **Important**: Never commit your API key to version control. Consider using:
- Environment variables
- Chrome extension storage with user input
- Backend proxy server for API calls

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main logic for word lookup
- `content.css` - Modal styling
- `popup.html` - Extension popup interface
