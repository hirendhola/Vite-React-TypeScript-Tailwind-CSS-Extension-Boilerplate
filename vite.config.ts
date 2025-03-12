/* eslint-disable @typescript-eslint/no-unused-vars */
// import path from "path"
// import tailwindcss from "@tailwindcss/vite"
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import webExtension from 'vite-plugin-web-extension';
// import fs from 'fs';

// function getManifestForBrowser(browser: string) {
//   const commonManifest = JSON.parse(fs.readFileSync('./src/manifest.common.json', 'utf-8'));
//   let browserSpecificManifest = {};

//   try {
//     browserSpecificManifest = JSON.parse(
//       fs.readFileSync(`./src/manifest.${browser}.json`, 'utf-8')
//     );
//   } catch (error) {
//     console.log(`No specific manifest for ${browser}, using common only`);
//   }

//   // Merge the common and browser-specific manifests
//   return {
//     ...commonManifest,
//     ...browserSpecificManifest,
//   };
// }

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const browser = process.env.BROWSER || 'chrome';
//   const isDev = mode === 'development';

//   return {
//     plugins: [
//       react(),
//       tailwindcss(),
//       webExtension({
//         manifest: () => getManifestForBrowser(browser),
//         browser,
//         webExtConfig: {
//           browserConsole: true,
//           // Set target dynamically based on browser
//           target: browser === 'firefox' ? 'firefox-desktop' : 'chromium',
//           ...(isDev && {
//             startUrl: ['https://example.com'],
//             watchPatterns: ['src/**/*'],
//           }),
//         },
//       }),],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//     define: {
//       'process.env.BROWSER': JSON.stringify(browser),
//       'process.env.NODE_ENV': JSON.stringify(mode),
//     },
//     server: {
//       hmr: {
//         protocol: 'ws',
//         host: 'localhost',
//       },
//     },
//     build: {
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             vendor: ['react', 'react-dom', 'webextension-polyfill'],
//             ui: ['./src/components/ui/**'],
//           }
//         }
//       },
//       sourcemap: isDev,
//     },
//   };
// });

import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension from 'vite-plugin-web-extension';
import fs from 'fs';

function getManifestForBrowser(browser: string) {
  const commonManifest = JSON.parse(fs.readFileSync('./src/manifest.common.json', 'utf-8'));
  let browserSpecificManifest = {};

  try {
    browserSpecificManifest = JSON.parse(
      fs.readFileSync(`./src/manifest.${browser}.json`, 'utf-8')
    );
  } catch (error) {
    console.log(`No specific manifest for ${browser}, using common only`);
  }

  return {
    ...commonManifest,
    ...browserSpecificManifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const browser = process.env.BROWSER || 'chrome';
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      tailwindcss(),
      webExtension({
        manifest: () => getManifestForBrowser(browser),
        browser,
        webExtConfig: {
          startUrl: ['https://example.com'],
          browserConsole: true,
          target: browser === 'firefox' ? 'firefox-desktop' : 'chromium',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.BROWSER': JSON.stringify(browser),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    build: {
      // Remove the rollupOptions with manualChunks
      sourcemap: isDev,
    },
  };
});
