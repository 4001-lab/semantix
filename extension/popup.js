const toggle = document.getElementById('toggleMode');

chrome.storage.sync.get(['toggleMode'], (result) => {
  toggle.checked = result.toggleMode || false;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ toggleMode: toggle.checked });
});
