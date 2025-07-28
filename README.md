# 📘 Dev Blog

---

## 📖 Table of Contents

- [📘 Dev Blog](#-dev-blog)
  - [📖 Table of Contents](#-table-of-contents)
  - [🤓 Overview](#-overview)
  - [📸 Demo](#-demo)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📦 Installation](#-installation)
  - [🚀 Scripts / Usage](#-scripts--usage)
  - [📁 Project Structure](#-project-structure)
  - [🌐 Live Site or Deployment](#-live-site-or-deployment)
  - [📌 To Do / Roadmap](#-to-do--roadmap)
  - [🧪 Known Issues](#-known-issues)
  - [📄 Licence](#-licence)
  - [👤 Author / Credits](#-author--credits)

---

## 🤓 Overview

This is the source code for my personal developer blog, built with Eleventy and Tailwind CSS. It supports tag-based filtering, responsive design, and deploys automatically to GitHub Pages using GitHub Actions.

---

## 📸 Demo

Live: [karlhorning.dev/dev-blog/](https://www.karlhorning.dev/dev-blog/)

---

## 🛠️ Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **Styling**: Tailwind CSS 4
- **Deployment**: GitHub Pages via GitHub Actions
- **Languages**: HTML, CSS, JavaScript

---

## 📦 Installation

```bash
git clone https://github.com/Karl-Horning/dev-blog.git
cd dev-blog
npm install
```

---

## 🚀 Scripts / Usage

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm start`          | Run both `dev:11ty` and `dev:css` in parallel      |
| `npm run build`      | Build both Eleventy and Tailwind output to `dist/` |
| `npm run dev:11ty`   | Start Eleventy in dev mode with live reload        |
| `npm run dev:css`    | Watch and compile Tailwind CSS with PostCSS        |
| `npm run build:11ty` | Build the Eleventy site to `dist/`                 |
| `npm run build:css`  | Build Tailwind CSS to `dist/css/` using PostCSS    |

---

## 📁 Project Structure

```bash
.
├── src/                      # Source content & templates
│   ├── _includes/            # Reusable layout components
│   ├── assets/               # Styles, fonts, images
│   ├── posts/                # Blog posts (HTML)
├── dist/                     # Production build output
├── .github/workflows/        # GitHub Actions CI/CD config
├── eleventy.config.mjs       # Eleventy config
├── tailwind.config.js        # Tailwind config
├── package.json
└── README.md
```

---

## 🌐 Live Site or Deployment

This site is deployed to GitHub Pages via [GitHub Actions](https://github.com/features/actions).

- **Workflow**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `main`
- **Steps**:

  1. Checkout code
  2. Install dependencies
  3. Run `npm run build`
  4. Deploy `dist/` folder to `gh-pages` branch using [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

> Deployment is automatic with no manual steps needed after pushing to `main`.

---

## 📌 To Do / Roadmap

- [x] Add RSS feed
- [x] Implement tag-based filtering
- [x] Connect to subdomain (`karlhorning.dev/dev-blog/`)
- [ ] Improve accessibility to meet WCAG AA
- [ ] Replace Markdown/MDX with custom HTML posts
- [ ] Add GitHub Actions workflow to export JSON data
- [ ] Add light mode support

---

## 🧪 Known Issues

- Accessibility audit requires improvement: headings, focus styles, and colour contrast in light mode
- Currently dark-theme only
- No built-in post authoring UI

---

## 📄 Licence

MIT © 2025 Karl Horning

---

## 👤 Author / Credits

Made with ❤️ by [Karl Horning](https://github.com/Karl-Horning)
