chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "DEFINE_WORD") {
    fetch("https://semantix-sable.vercel.app/api/define", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg.payload)
    })
      .then(async (r) => {
        if (!r.ok) {
          sendResponse({ error: `Server error: ${r.status}` });
          return;
        }
        const contentType = r.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await r.text();
          console.error('Non-JSON response:', text);
          sendResponse({ error: 'Server returned invalid response' });
          return;
        }
        return r.json();
      })
      .then(data => data && sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));

    return true;
  }
});
