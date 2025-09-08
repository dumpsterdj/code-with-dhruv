# Python Course Website (Vite + React + TypeScript)

> Lightweight, single-page site for a Python course — built with Vite, React, and TypeScript.

## 📚 Project overview
This repository contains a Vite + React + TypeScript single-page app for a Python course website (lessons, courses, navigation). It includes components such as `Home`, `Course`, `Lesson`, and a simple layout. The project is prepared for modern development workflows (npm scripts, CI, and deployment).

## 🚀 Features
- Vite-powered dev server (fast refresh)
- React + TypeScript
- SEO-friendly HTML (`index.html`)
- Ready for GitHub Pages or Vercel deployment
- CI build workflow for PR and branch safety

## 🔧 Prerequisites
- Node.js >= 18 (recommended)
- npm >= 8 (or use pnpm/yarn if you prefer — update scripts)
- Git

## Getting started (local)
1. Clone the repo:
```bash
git clone https://github.com/dumpsterdj/code-with-dhruv
cd code-with-dhruv
````

2. Install:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
# open http://localhost:5173
```

4. Build for production:

```bash
npm run build
```

5. Preview production build locally:

```bash
npm run preview
```

## Available scripts

These are the standard scripts (check your package.json):

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .ts,.tsx,.js,.jsx || true",
  "format": "prettier --write . || true"
}
```

> If you use `gh-pages` for GitHub Pages deployment, add:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

## CI (GitHub Actions)

This repo contains a simple CI workflow that installs dependencies and runs a build for pull requests and pushes to `main`. See `.github/workflows/ci.yml` in the repo.

## Deployment

### Option A — Deploy to Vercel (recommended)

1. Create an account on Vercel and connect your GitHub repository.
2. Vercel will auto-detect Vite and set:

   * Build command: `npm run build`
   * Output directory: `dist`
3. Save and deploy — Vercel will automatically redeploy on pushes.

### Option B — GitHub Pages

1. Add the `homepage` field to `package.json` (if deploying to username.github.io/repo):

```json
"homepage": "https://dumpsterdj.github.io/code-with-dhruv"
```

2. Install `gh-pages`:

```bash
npm install --save-dev gh-pages
```

3. Add scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

4. Deploy:

```bash
npm run deploy
```

### Option C — Netlify

* Connect your repo to Netlify.
* Build command: `npm run build`
* Publish directory: `dist`

## License

This project is licensed under the MIT License — see `LICENSE`.

## Contact

Dhruvjeet Singh — change this contact info to your preferred email or profile.

---

# LICENSE (MIT)

```text
MIT License

Copyright (c) 2025 Dhruvjeet Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
...
[Use the standard MIT license body — copy from https://choosealicense.com/licenses/mit/ and replace year/name]
```

*(Replace with your name and year.)*
