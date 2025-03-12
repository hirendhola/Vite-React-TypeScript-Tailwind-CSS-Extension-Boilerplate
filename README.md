# Vite + React + TypeScript + Tailwind CSS Boilerplate

A modern, feature-rich boilerplate for building React applications with TypeScript and Tailwind CSS, powered by Vite for lightning-fast development.

![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)
![React](https://img.shields.io/badge/React-Latest-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🚀 **Vite** - Lightning-fast development and build times
- ⚛️ **React** - A JavaScript library for building user interfaces
- 📘 **TypeScript** - Type-safe code for better developer experience
- 🎨 **Tailwind CSS v4** - Utility-first CSS framework
- 🔥 **HMR (Hot Module Replacement)** - Instantly see your changes without refreshing
- 🧪 **Vitest & Testing Library** - Comprehensive testing setup
- 📏 **ESLint & Prettier** - Code quality and formatting
- 📁 **Well-organized project structure** - Intuitive folder organization
- 🛠️ **Optimized build setup** - Production-ready with a single command

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher (or yarn/pnpm)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/vite-react-ts-tailwind-boilerplate.git my-project

# Navigate to the project directory
cd my-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see your app in action!

## 📁 Project Structure

```
my-project/
├── public/             # Static files
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Application entry point
│   ├── index.css       # Global styles
│   └── main.tsx        # React rendering
├── .eslintrc.cjs       # ESLint configuration
├── .prettierrc         # Prettier configuration
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 📝 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm run test`    | Run tests with Vitest            |
| `npm run format`  | Format code with Prettier        |

## ⚙️ Configuration

### Vite

Vite configuration is in `vite.config.ts`. Key features:

- HMR configured for seamless development
- Source maps enabled for production builds
- Test environment setup

### Tailwind CSS

Tailwind is configured in `tailwind.config.js` and initialized in `src/index.css`.

### TypeScript

TypeScript configuration is in `tsconfig.json`, optimized for React development.

### ESLint & Prettier

Code quality tools are configured in `.eslintrc.cjs` and `.prettierrc`.

## 🧩 Adding Dependencies

### Routing

```bash
npm install react-router-dom
```

### State Management

```bash
# Redux Toolkit
npm install @reduxjs/toolkit react-redux

# Or Zustand (lighter alternative)
npm install zustand
```

### Form Handling

```bash
npm install react-hook-form zod @hookform/resolvers
```

### UI Components

```bash
# Headless UI components
npm install @headlessui/react

# Icons
npm install lucide-react
```

## 🔧 Customization

### Styling

This boilerplate uses Tailwind CSS v4. You can customize the theme in `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
        primary: "#3B82F6",
        secondary: "#10B981",
      },
      // ...other customizations
    },
  },
  // ...
};
```

### Environment Variables

Create `.env`, `.env.development`, or `.env.production` files in the project root. Prefix variables with `VITE_` to make them available in your React code:

```
VITE_API_URL=https://api.example.com
```

Access them in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📱 Browser Support

This boilerplate supports all modern browsers. For older browser support, consider adding appropriate polyfills.

## 🛠️ Troubleshooting

### HMR not working properly

Try the following:

1. Check if `server.hmr` is properly configured in `vite.config.ts`
2. Clear browser cache and restart the development server
3. Ensure your code is compatible with HMR (avoid side effects in the module scope)

### Build Optimization Issues

If you encounter large bundle sizes, consider:

1. Using dynamic imports for code splitting
2. Analyzing bundle with `npm install -D rollup-plugin-visualizer`
3. Enabling tree shaking in your dependencies

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
