document.addEventListener('DOMContentLoaded', function() {
  const colorPicker = document.getElementById('colorPicker');
  const applyBtn = document.getElementById('applyBtn');
  const resetBtn = document.getElementById('resetBtn');
  const status = document.getElementById('status');
  const presetColors = document.querySelectorAll('.color-btn');


  // Handle preset color buttons
  presetColors.forEach(button => {
    button.addEventListener('click', function() {
      colorPicker.value = this.dataset.color;
    });
  });

  // Apply button click handler
  applyBtn.addEventListener('click', function() {
    const color = colorPicker.value;
    
    // Save the selected color
    chrome.storage.sync.set({backgroundColor: color});
    
    // Send message to content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'changeBackground',
        color: color
      }, function(response) {
        if (response && response.success) {
          showStatus('Background color applied successfully!', 'success');
        } else {
          showStatus('Failed to apply background color', 'error');
        }
      });
    });
  });

  // Reset button click handler
  resetBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'resetBackground'
      }, function(response) {
        if (response && response.success) {
          showStatus('Background reset to original', 'success');
        } else {
          showStatus('Failed to reset background', 'error');
        }
      });
    });
  });

  // Show status message
  function showStatus(message, type) {
    status.textContent = message;
    status.className = 'status ' + type;
    
    // Clear status after 3 seconds
    setTimeout(function() {
      status.textContent = '';
      status.className = 'status';
    }, 3000);
  }

  // Load saved settings
  chrome.storage.sync.get(['backgroundColor'], function(result) {
    if (result.backgroundColor) {
      colorPicker.value = result.backgroundColor;
    }
  });
});
