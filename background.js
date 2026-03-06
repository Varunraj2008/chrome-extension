// Background script for the Chrome extension
chrome.runtime.onInstalled.addListener(function() {
  // Set default values when extension is installed
  chrome.storage.sync.set({
    backgroundColor: '#ffffff'
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener(function(tab) {
  // The popup will handle the click, this is just a fallback
  chrome.action.openPopup();
});

// Listen for storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync') {
    // You can add logic here to handle storage changes if needed
    console.log('Storage changed:', changes);
  }
});
