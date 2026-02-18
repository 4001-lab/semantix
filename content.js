document.body.addEventListener('dblclick', async () => {
  const text = window.getSelection().toString().trim();
  if (!text || text.length > 15) return;

  const pageTitle = document.title.toUpperCase();
  showLoader();

  // Update this URL after deploying to Vercel
  const API_URL = 'https://semantix-sable.vercel.app/api/define'; //'http://localhost:3000/api/define'; // Change to: https://your-app.vercel.app/api/define

  chrome.storage.local.get(['geminiApiKey'], async (result) => {
    // TO DO: uncomment this block to require API key
    // if (!result.geminiApiKey) {
    //   displayError('Please set your API key in the extension popup');
    //   return;
    // }

    try {
      chrome.runtime.sendMessage(
        {
          type: "DEFINE_WORD",
          payload: {
            word: text,
            pageTitle,
            apiKey: result.geminiApiKey
          }
        },
        (response) => {
          if (chrome.runtime.lastError) {
            displayError("Extension error");
            return;
          }

          if (response?.error) {
            displayError(response.error);
          } else {
            displayDefinition(response.content);
          }
        }
      );

    } catch (error) {
      console.error('Error:', error);
      displayError('Network error. Please check your connection.');
    }
  });
});

function showLoader() {
  const modal = document.createElement('div');
  modal.id = 'vocab-modal';
  modal.className = 'vocab-modal';
  modal.innerHTML = `
    <div class="vocab-content">
      <div class="vocab-header">
        <span class="vocab-close">&times;</span>
        <h2>Loading...</h2>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('.vocab-close').onclick = () => modal.remove();
}

function displayDefinition(content) {
  if (!content) {
    closeModal();
    return;
  }

  const lines = content.split('\n').filter(l => l.trim());
  const data = {};

  lines.forEach(line => {
    if (line.includes('1.') && line.includes('Word:')) data.word = line.split('Word:')[1]?.trim();
    if (line.includes('2.') && line.includes('Category:')) data.category = line.split('Category:')[1]?.trim();
    if (line.includes('3.') && line.includes('Meaning:')) data.meaning = line.split('Meaning:')[1]?.trim();
    if (line.includes('4.') && line.includes('Synonyms:')) data.synonyms = line.split('Synonyms:')[1]?.trim();
    if (line.includes('5.') && line.includes('Antonyms:')) data.antonyms = line.split('Antonyms:')[1]?.trim();
    if (line.includes('6.') && line.includes('Usage:')) data.usage = line.split('Usage:')[1]?.trim();
  });

  const modal = document.getElementById('vocab-modal');
  modal.innerHTML = `
    <div class="vocab-content">
      <div class="vocab-header">
        <span class="vocab-close">&times;</span>
        <h2>${data.word || 'Word'}: <i>${data.category || ''}</i></h2>
      </div>
      <div class="vocab-body">
        <p><b>Definition:</b> ${data.meaning || ''}</p>
        <p><b>Synonyms:</b> ${data.synonyms || ''}</p>
        <p><b>Antonyms:</b> ${data.antonyms || ''}</p>
      </div>
      <div class="vocab-footer">
        <p><b>Usage:</b> ${data.usage || ''}</p>
      </div>
    </div>`;

  modal.querySelector('.vocab-close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

function displayError(message) {
  const modal = document.getElementById('vocab-modal');
  if (modal) {
    modal.innerHTML = `
      <div class="vocab-content">
        <div class="vocab-header">
          <span class="vocab-close">&times;</span>
          <h2>Error</h2>
        </div>
        <div class="vocab-body">
          <p>${message}</p>
        </div>
      </div>`;
    modal.querySelector('.vocab-close').onclick = () => modal.remove();
  }
}

function closeModal() {
  document.getElementById('vocab-modal')?.remove();
}
