// Store original background when content script loads
let originalBackground = null;

// Save original background when page loads
function saveOriginalBackground() {
  const body = document.body;
  originalBackground = {
    backgroundColor: window.getComputedStyle(body).backgroundColor,
    backgroundImage: window.getComputedStyle(body).backgroundImage,
    background: window.getComputedStyle(body).background
  };
}

// Apply background color to body element
function applyBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  return true;
}

// Reset background to original
function resetBackground() {
  if (originalBackground) {
    document.body.style.backgroundColor = originalBackground.backgroundColor;
    document.body.style.backgroundImage = originalBackground.backgroundImage;
    document.body.style.background = originalBackground.background;
  }
  return true;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'changeBackground') {
    const success = applyBackgroundColor(request.color);
    sendResponse({success: success});
  } else if (request.action === 'resetBackground') {
    const success = resetBackground();
    sendResponse({success: success});
  }
  return true; // Keep the message channel open for async response
});

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', saveOriginalBackground);
} else {
  saveOriginalBackground();
}

// Handle page navigation (for single-page applications)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // Reset on navigation to avoid conflicts
    resetBackground();
    saveOriginalBackground();
  }
}).observe(document, {subtree: true, childList: true});
