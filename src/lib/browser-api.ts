/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Browser Detection and API Unification
 */

// Import the webextension polyfill
import webextensionPolyfill from 'webextension-polyfill';

// Define a global interface for TypeScript to recognize 'browser'
declare global {
  let browser: typeof webextensionPolyfill | undefined;
  // let chrome: any; // Removed to avoid redeclaration error
  interface Window {
    browser: typeof webextensionPolyfill | undefined;
  }
}

type Browser = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'brave' | 'other';

interface BrowserInfo {
  name: Browser;
  isChromium: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  manifestVersion: number;
  supportsPromises: boolean;
}

// Detect browser at runtime
function detectBrowser(): BrowserInfo {
  const userAgent = navigator.userAgent.toLowerCase();

  // Initialize with defaults
  const info: BrowserInfo = {
    name: 'other',
    isChromium: false,
    isFirefox: false,
    isSafari: false,
    manifestVersion: 3,
    supportsPromises: true,
  };

  // Detect specific browser
  if (userAgent.includes('firefox')) {
    info.name = 'firefox';
    info.isFirefox = true;
    info.manifestVersion = 2;
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    info.name = 'safari';
    info.isSafari = true;
  } else if (userAgent.includes('edg')) {
    info.name = 'edge';
    info.isChromium = true;
  } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
    info.name = 'opera';
    info.isChromium = true;
  } else if (userAgent.includes('brave')) {
    info.name = 'brave';
    info.isChromium = true;
  } else if (userAgent.includes('chrome')) {
    info.name = 'chrome';
    info.isChromium = true;
  }

  // Try to detect manifest version using runtime API if possible
  try {
    // Use type assertion to safely check runtime APIs
    const chromeRuntime = (chrome as any)?.runtime;
    const browserRuntime = (window.browser as any)?.runtime;

    const manifest = chromeRuntime?.getManifest?.() || browserRuntime?.getManifest?.();
    if (manifest && manifest.manifest_version) {
      info.manifestVersion = manifest.manifest_version;
    }
  } catch (e) {
    console.debug('Could not detect manifest version:', e);
  }

  return info;
}

// Rest of your code remains the same

// Global detection that runs once
const browserInfo = detectBrowser();

/**
 * Gets information about the current browser
 */
export function getBrowserInfo(): BrowserInfo {
  return { ...browserInfo }; // Return a copy to prevent modification
}

/**
 * The unified browser API
 * This provides a consistent interface across different browsers
 */
const browserAPI = (() => {
  // Use the appropriate global if available
  let api: any;

  // Try to use browser (Firefox) first, then chrome
  if (typeof browser !== 'undefined') {
    api = browser;
  } else if (typeof chrome !== 'undefined') {
    api = chrome;
  } else {
    // Fallback for other contexts (unlikely in extension)
    console.warn('No browser extension API found');
    api = {};
  }

  // Helper to convert callback-based APIs to Promises
  function promisify(fn: Function, context: any) {
    return (...args: any[]) => {
      return new Promise((resolve, reject) => {
        fn.call(context, ...args, (result: any) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result);
          }
        });
      });
    };
  }

  // Chrome uses callbacks, Firefox uses Promises
  // If we're in Chrome, wrap APIs with Promises for consistency
  if (browserInfo.isChromium && !browserInfo.isSafari) {
    // Only promisify if the browser doesn't already support promises
    const needsPromisify = typeof api.storage?.local?.get?.then !== 'function';

    if (needsPromisify) {
      // Storage API
      if (api.storage && api.storage.local) {
        const local = api.storage.local;
        api.storage.local = {
          get: promisify(local.get, local),
          set: promisify(local.set, local),
          remove: promisify(local.remove, local),
          clear: promisify(local.clear, local),
          // Keep the original methods available
          _get: local.get.bind(local),
          _set: local.set.bind(local),
          _remove: local.remove.bind(local),
          _clear: local.clear.bind(local),
        };
      }

      // Tabs API
      if (api.tabs) {
        const tabs = api.tabs;
        api.tabs = {
          ...tabs, // Keep all original methods
          query: promisify(tabs.query, tabs),
          create: promisify(tabs.create, tabs),
          update: promisify(tabs.update, tabs),
          sendMessage: promisify(tabs.sendMessage, tabs),
          // Original methods
          _query: tabs.query.bind(tabs),
          _create: tabs.create.bind(tabs),
          _update: tabs.update.bind(tabs),
          _sendMessage: tabs.sendMessage.bind(tabs),
        };
      }

      // Runtime API
      if (api.runtime) {
        const runtime = api.runtime;
        // sendMessage specifically needs special handling
        const originalSendMessage = runtime.sendMessage;
        api.runtime.sendMessage = (...args: any[]) => {
          // If the last arg is a function, use the callback pattern
          if (typeof args[args.length - 1] === 'function') {
            return originalSendMessage.apply(runtime, args);
          }
          // Otherwise use a Promise
          return promisify(originalSendMessage, runtime)(...args);
        };
        // Keep original
        api.runtime._sendMessage = originalSendMessage.bind(runtime);
      }
    }
  }

  // Additional Safari-specific fixes
  if (browserInfo.isSafari) {
    // TODO: Add any Safari-specific APIs or patches here
  }

  return api;
})();

export default browserAPI;
