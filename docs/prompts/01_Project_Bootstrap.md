# Prompt 01 - Project Bootstrap

You are the Lead Software Architect. Build the project foundation for BharatOne AI.

## Objectives
* React 19 + Vite 8 SPA.
* Install: firebase, @supabase/supabase-js, framer-motion, axios, react-router-dom, react-hot-toast, react-hook-form, react-dropzone, react-markdown, lucide-react, clsx, dayjs, tesseract.js, esbuild, tailwindcss, @tailwindcss/vite.
* Configure path alias `@/` pointing to `/src/`.
* Configure ESLint flat configuration, Prettier, .editorconfig, and .gitignore.
* Create folder subdirectories: assets, components, config, constants, contexts, features, hooks, layouts, lib, providers, routes, services, shared, styles, utils.
* Configure mock connections firebase.js and supabase.js under config/.
* Build AppProvider, ThemeProvider, ToastProvider, and ErrorBoundary wrappers inside providers/.
* Create routes/index.jsx pointing to text-only placeholder shells.
* Compile global index.css with minimal Tailwind v4 resets and dark-first color styles.

## Verification
* Ensure `npm run lint` compiles cleanly with zero errors and zero warnings.
* Ensure `npm run build` succeeds using the esbuild minifier, outputting assets without warnings.
