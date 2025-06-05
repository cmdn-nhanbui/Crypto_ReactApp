# 🚀 Crypto React App

This project is a boilerplate for quickly starting a React application using Vite and TypeScript. It’s designed for high performance and modern development.

## 🧱 Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 📦 System Requirements

- [Node.js](https://nodejs.org/) v16 or higher (LTS recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/cmdn-nhanbui/Crypto_ReactApp
cd Crypto_ReactApp
```

### 2. Install dependencies

```bash
npm install
```

This command installs all required packages listed in `package.json`.

### 3. Start the development server

```bash
npm start
```

If `npm start` is not defined in `package.json`, use:

```bash
npm run dev
```

This will start the Vite development server at [http://localhost:3000](http://localhost:5173).

## 🛠 Useful Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm install`     | Install project dependencies         |
| `npm start`       | Alias to `npm run dev`               |
| `npm run dev`     | Start the development server (Vite)  |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint the code using ESLint           |
| `npm run format`  | Format code using Prettier           |

## 📁 Project Structure

```bash
.
├── public/                  # Static public assets (if any)
├── dist/                    # Build output directory
├── src/                     # Main source code
│   ├── App.tsx             # Root component
│   ├── main.tsx            # App entry point
│   ├── index.css           # Global CSS
│   ├── assets/             # Images, SVGs, icons, etc.
│   ├── app/                # Core logic & application-level routes
│   │   ├── app.route.ts   # Top-level route config
│   │   ├── core/          # Utilities, constants, and services
│   │   ├── pages/         # Feature-based page modules (home, coin, error...)
│   │   ├── shared/        # Reusable components, contexts, hooks, layout
│   │   └── page.routes.ts # Aggregated route file
│   ├── mocks/              # Mock data using Mock Service Worker (MSW)
│   ├── stylesheet/         # SCSS and CSS for theming and layout
│   └── vite-env.d.ts       # Type definitions for Vite environment
├── .env                     # Environment variables
├── .gitignore               # Files ignored by Git
├── .prettierrc              # Prettier configuration
├── eslint.config.js         # ESLint configuration
├── package.json             # Project metadata and scripts
├── tsconfig*.json           # TypeScript configuration files
├── tailwind.config.ts       # TailwindCSS configuration
├── vite.config.ts           # Vite configuration
├── index.html               # Main HTML template
└── README.md                # Project documentation

```

## ✅ Suggestions for Improvement

- Add **React Router** for routing
- Integrate **State management** (Redux, Zustand, or Context API)
- Set up **CI/CD** with GitHub Actions
- Add **Unit Testing** with Vitest or Jest

## 🔧 Optional: Add `npm start` Alias

To enable `npm start`, add the following to your `package.json`:

```json
"scripts": {
  "start": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
},
```

## 📄 License

MIT © 2025 [cmdn - Nhan Bui T.]
