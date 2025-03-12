# Modern Browser Extension Boilerplate

A powerful, feature-rich boilerplate for building cross-browser extensions using React, TypeScript, Tailwind CSS, and Vite. Designed for modern web development with first-class developer experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)
![React](https://img.shields.io/badge/React-Latest-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Latest-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Key Features

### Cross-Browser Support

- 🌐 **Multi-Browser Compatibility**
  - Chrome/Chromium-based browsers (v3 manifest)
  - Firefox (v2 manifest)
  - Safari
  - Edge
  - Brave

### Modern Tech Stack

- ⚡ **Vite** for lightning-fast development
- ⚛️ **React 19** with latest features
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** with custom UI components
- 🎭 **Shadcn/ui** components integration

### Developer Experience

- 🔥 **Hot Module Replacement (HMR)** for instant updates
- 🧪 **Type-safe messaging system** between extension components
- 🛠️ **Browser API abstraction** layer for unified development
- 📦 **Manifest generation** per browser
- 🔍 **ESLint + Prettier** configuration
- 🎯 **Path aliases** for clean imports

### Extension Features

- 🔌 **Content Scripts** with TypeScript support
- 🌍 **Background Service Worker**
- 🪟 **Popup Interface** with React
- 💾 **Storage API** abstraction
- 📨 **Message passing** utilities
- 🔒 **Permission handling**

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/modern-browser-extension-boilerplate.git

# Install dependencies
npm install

# Development
npm run dev:chrome    # Chrome development
npm run dev:firefox   # Firefox development
npm run dev:safari    # Safari development
npm run dev:all      # Develop for all browsers

# Building
npm run build:chrome   # Build for Chrome
npm run build:firefox  # Build for Firefox
npm run build:safari   # Build for Safari
npm run build:all     # Build for all browsers

# Packaging
npm run pack:all      # Create distribution packages
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/          # Shadcn/ui components
├── lib/             # Utility functions
│   ├── browser-api.ts   # Browser API abstraction
│   └── utils.ts     # Helper functions
├── popup/           # Extension popup interface
├── content/         # Content scripts
├── background/      # Service worker
└── manifest/        # Browser-specific manifests
```

## 🛠️ Development Features

### Hot Module Replacement

- Instant updates for popup and content scripts
- Preserves state during development
- Automatic reloading when needed

### Browser API Abstraction

```typescript
// Unified API calls across browsers
import browserAPI from '@/lib/browser-api';

// Works in Chrome, Firefox, and Safari
await browserAPI.storage.local.set({ key: 'value' });
await browserAPI.tabs.query({ active: true });
```

### Type-Safe Messaging

```typescript
// Type-safe message passing between components
browserAPI.runtime.sendMessage({
  type: 'ACTION_TYPE',
  payload: data,
});
```

### UI Components

- Pre-configured Shadcn/ui components
- Custom theme support
- Dark/Light mode
- Responsive design

## 📦 Building and Distribution

### Automated Builds

- Browser-specific manifest generation
- Optimal bundle splitting
- Source map generation
- Asset optimization

### Distribution Packages

- Automatically generates ZIP files for store submission
- Separate builds for each browser
- Development and production configurations

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the build system
- [React](https://react.dev/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn/ui](https://ui.shadcn.com/) for UI components
- All contributors and maintainers