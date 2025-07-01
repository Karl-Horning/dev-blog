# Dev Blog

## 📖 Table of Contents

- [Dev Blog](#dev-blog)
  - [📖 Table of Contents](#-table-of-contents)
  - [🤓 Overview](#-overview)
  - [🚀 Features](#-features)
  - [📁 Project Structure](#-project-structure)
  - [🛠️ Getting Started](#️-getting-started)
    - [1. Clone the repo](#1-clone-the-repo)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Run the development server](#3-run-the-development-server)
    - [4. Build for production](#4-build-for-production)
  - [🧪 Scripts](#-scripts)
  - [🚚 Deployment](#-deployment)
    - [🔁 Workflow: `.github/workflows/deploy.yml`](#-workflow-githubworkflowsdeployyml)
    - [📌 To Do / Future Enhancements](#-to-do--future-enhancements)

---

## 🤓 Overview

A personal developer blog powered by [Eleventy (11ty)](https://www.11ty.dev/) and styled with [Tailwind CSS](https://tailwindcss.com/). This static site is deployed automatically to GitHub Pages via GitHub Actions.

---

## 🚀 Features

- ⚡ Fast static site generation with Eleventy
- 🎨 Modern styling using Tailwind CSS 4
- 🏷️ Tag-based filtering and navigation
- 📱 Responsive layout with accessible design
- 🔄 Automatic deployment to GitHub Pages

---

## 📁 Project Structure

```text

.
├── src/                      # Source content & templates
│   ├── _includes/            # Reusable layout components
│   ├── assets/               # Styles (Tailwind input), fonts, images
│   ├── posts/                # Blog posts (Markdown)
│   └── ...
├── dist/                     # Output folder for production site (generated)
├── .github/workflows/        # GitHub Actions CI/CD config
├── eleventy.config.mjs       # Eleventy config
├── tailwind.config.js        # Tailwind config
├── package.json
└── README.md

````

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Karl-Horning/dev-blog.git
cd dev-blog
````

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm start
```

This will:

- Watch and rebuild Tailwind CSS
- Serve the site locally via Eleventy at `http://localhost:8080`

### 4. Build for production

```bash
npm run build
```

This will output the static site to the `dist/` directory.

---

## 🧪 Scripts

| Script            | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm start`       | Run Tailwind and Eleventy in watch/dev mode     |
| `npm run build`   | Build Tailwind CSS and Eleventy site to `dist/` |
| `npm run dev:*`   | Individual dev scripts (Tailwind / Eleventy)    |
| `npm run build:*` | Individual build scripts                        |

---

## 🚚 Deployment

This project is deployed to GitHub Pages via [GitHub Actions](https://github.com/features/actions).

### 🔁 Workflow: `.github/workflows/deploy.yml`

- Trigger: Push to `main`
- Steps:

  1. Checkout code
  2. Install dependencies
  3. Run `npm run build`
  4. Deploy `dist/` folder to `gh-pages` branch using [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

> Deployment is automatic with no manual steps needed after pushing to `main`.

### 📌 To Do / Future Enhancements

- [ ] **Add RSS feed**
  Enable feed generation for blog syndication and subscriptions.
- [x] **Tag-based filtering**
  Already implemented: posts can be filtered by tags via tag pages.
- [ ] **Improve accessibility audit**
  Ensure the site passes WCAG AA standards and includes semantic landmarks, focus indicators, and appropriate colour contrast in both light and dark modes.
- [ ] **Use custom HTML components instead of Markdown/MDX**
  Continue using HTML for finer control over blog post content and styling, rather than Markdown or MDX.
- [ ] **Connect to main site subdomain**
  Serve this blog from a subdomain like `blog.karl-horning.com`.
- [ ] **Automated JSON export for external use**
  Add a GitHub Actions workflow to update `Karl-Horning.github.io/public/data/blogPosts.json` whenever posts are added or changed.
- [ ] **Light/dark theme support**
  Update with a light theme, as currently, only a dark theme is supported.

---

Made with ❤️ by [Karl Horning](https://github.com/Karl-Horning)
