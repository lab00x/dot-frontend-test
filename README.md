# Dot Frontend Test

## Setup Instructions

- run `git clone https://github.com/lab00x/dot-frontend-test.git` in your command prompt
- run `cd dot-frontend-test`
- run `npm install` to install all the required dependencies
- then use `npm run dev` to the application in the development environment

## Assumptions and Design Decisions

- I'm assuming the tester will run the server locally concurrently as this client side application to be able to see the client-server interactions.
- I followed the screenshots shared in the project description and use my discretion on some parts.

## Additional Features Implemented

- Utility functions to extract product categories for sidebar menu options (/utils/extractCategories.ts)

## Areas for Improvement

- Adding debouncing to the product search so it doesn't make api call at every change of input field character

## GitHub Repository

[Insert the link to your GitHub repository here when you're done]

<!-- ***************************************************** -->

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
