/* eslint-disable @typescript-eslint/no-explicit-any */
import browserAPI, { getBrowserInfo } from './lib/browser-api';

console.log(`Background script running in ${getBrowserInfo().name} browser`);

// Handle messages from content scripts and popup
browserAPI.runtime.onMessage.addListener((message: any, sender: any, sendResponse: any) => {
  console.log('Received message:', message, 'from:', sender);

  // Example of processing different message types
  if (message.type === 'GET_DATA') {
    browserAPI.storage.local
      .get('data')
      .then((result: { data: any }) => {
        sendResponse({ success: true, data: result.data || {} });
      })
      .catch((error: { message: any }) => {
        console.error('Error getting data:', error);
        sendResponse({ success: false, error: error.message });
      });

    // Return true to indicate we'll respond asynchronously
    return true;
  }

  if (message.type === 'SAVE_DATA') {
    browserAPI.storage.local
      .set({ data: message.data })
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error: { message: any }) => {
        console.error('Error saving data:', error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }

  // For unhandled message types
  sendResponse({ success: false, error: 'Unknown message type' });
  return false;
});

// Example: Listen for installation or update
browserAPI.runtime.onInstalled.addListener((details: { reason: string }) => {
  console.log('Extension installed or updated:', details);

  // Initialize default settings on install
  if (details.reason === 'install') {
    browserAPI.storage.local.set({
      settings: {
        theme: 'light',
        notifications: true,
        lastUpdated: new Date().toISOString(),
      },
    });
  }
});
