/* eslint-disable @typescript-eslint/no-explicit-any */
import browserAPI, { getBrowserInfo } from './lib/browser-api';

const browser = getBrowserInfo();
console.log(`Content script running in ${browser.name} browser`);

// Inject a DOM element to show the extension is active
function injectStatus() {
  const statusDiv = document.createElement('div');
  statusDiv.id = 'extension-status';
  statusDiv.style.position = 'fixed';
  statusDiv.style.bottom = '10px';
  statusDiv.style.right = '10px';
  statusDiv.style.padding = '5px 10px';
  statusDiv.style.background = 'rgba(0, 0, 0, 0.7)';
  statusDiv.style.color = 'white';
  statusDiv.style.borderRadius = '4px';
  statusDiv.style.fontSize = '12px';
  statusDiv.style.zIndex = '9999';
  statusDiv.textContent = `Extension active in ${browser.name}`;

  // Only show briefly then remove
  document.body.appendChild(statusDiv);
  setTimeout(() => {
    if (statusDiv.parentNode) {
      statusDiv.parentNode.removeChild(statusDiv);
    }
  }, 3000);
}

// Example: Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  injectStatus();

  // Example: Send a message to the background script
  browserAPI.runtime
    .sendMessage({
      type: 'CONTENT_READY',
      url: window.location.href,
      title: document.title,
    })
    .then((response: any) => {
      console.log('Background script response:', response);
    })
    .catch((error: any) => {
      console.error('Error communicating with background script:', error);
    });
});

// Listen for messages from popup or background
browserAPI.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
  console.log('Content script received message:', message);

  if (message.type === 'GET_PAGE_INFO') {
    sendResponse({
      success: true,
      data: {
        url: window.location.href,
        title: document.title,
        metaDescription:
          document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
        images: Array.from(document.querySelectorAll('img'))
          .map(img => ({
            src: img.src,
            alt: img.alt,
          }))
          .slice(0, 10), // Limit to 10 images
      },
    });
    return true;
  }

  return false;
});
