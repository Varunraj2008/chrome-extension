# Background Color Changer Chrome Extension

A Chrome extension that allows users to dynamically change the background color of any website.

## Features

- **Color Picker**: Choose any color using the HTML5 color picker
- **Quick Presets**: Select from 8 preset colors for quick changes
- **Opacity Control**: Adjust the transparency of the background overlay (0-100%)
- **Apply/Reset**: Apply changes or reset to the original background
- **Persistent Settings**: Your color and opacity preferences are saved
- **Non-intrusive**: Uses an overlay system that doesn't modify the original website

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your Chrome toolbar

## Usage

1. Navigate to any website
2. Click the extension icon in your Chrome toolbar
3. Choose a color using the color picker or preset buttons
4. Adjust the opacity if desired
5. Click "Apply" to change the background
6. Click "Reset" to restore the original background

## Files Structure

- `manifest.json` - Extension configuration and permissions
- `popup.html` - The popup interface that appears when clicking the extension
- `popup.css` - Styling for the popup interface
- `popup.js` - Logic for the popup interface
- `content.js` - Script that runs on web pages to apply background changes
- `background.js` - Service worker for extension background tasks

## How It Works

The extension uses a non-intrusive overlay system:
- Creates a fixed-position div with high z-index
- Applies the selected color and opacity to this overlay
- Preserves the original website functionality
- Handles single-page applications and navigation

## Permissions

- `activeTab` - Access to the currently active tab
- `storage` - Save user preferences

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Notes

- The overlay is positioned with `pointer-events: none` to maintain website interactivity
- Original background is preserved and can be restored anytime
- Works on most websites including dynamic single-page applications
