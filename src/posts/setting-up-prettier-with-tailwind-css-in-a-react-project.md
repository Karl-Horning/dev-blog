---
title: Setting Up Prettier with Tailwind CSS in a React Project (Without Forgetting Next Time)
date: 2025-08-04T18:00:00+00:00
author: Karl Horning
description: "A quick walkthrough for setting up Prettier with Tailwind CSS in a new React project using either Next.js or Vite. Written mainly as a reminder to myself — but hopefully useful for others too."
summary: "A personal checklist for setting up Prettier with Tailwind CSS, covering installation, configuration, and project setup in both Next.js and Vite. Ideal for React developers who want to save a few minutes each time."
tags: ["Prettier", "Tailwind CSS", "React", "Next.js", "Vite", "JavaScript", "Frontend"]
image: /assets/img/prettier_tailwind.webp
thumbnail: "/assets/img/prettier_tailwind.webp"
---

This post is mainly for me — the kind of thing I'll want to come back to next time I spin up a new React project and think, *"How did I set up Prettier and Tailwind last time?"* That said, I've tried to write it clearly in case it helps someone else too.

In the future, I might wrap all this into a proper template repo, but for now, here's the manual checklist I follow.

> 📝 I usually create the GitHub repo first and clone it locally, so I initialise Next.js or Vite in an existing folder. If you're doing the same, remember to use the `.` at the end of your command to scaffold into the current directory.

---

## 🧱 Starting a New Next.js Project

From your Visual Studio Code terminal, run:

```bash
npx create-next-app@latest .
```

(The full stop at the end tells it to install into the current folder.)

Here are the options I usually pick:

```bash
Would you like to use TypeScript?                    Yes
Would you like to use ESLint?                        No
Would you like to use Tailwind CSS?                  Yes
Would you like your code inside a `src/` directory?  Yes
Would you like to use App Router? (recommended)      Yes
Would you like to use Turbopack for `next dev`?      Yes
Would you like to customise the import alias?        No
```

Once that's done, install Prettier and the Tailwind plugin:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Then, at the bottom of your `package.json`, add the following config:

```json
"prettier": {
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "plugins": [
        "prettier-plugin-tailwindcss"
    ]
}
```

That's it — Prettier will now sort your Tailwind classes automatically when you format. (`Option + Shift + F` is the shortcut on macOS.)

---

## ⚡ Bonus: Using Prettier + Tailwind CSS in a Vite Project

The setup is nearly identical when working with Vite, but here's a quick run-through for completeness.

### Step 1: Install Tailwind CSS and its Vite plugin

```bash
npm install tailwindcss @tailwindcss/vite
```

### Step 2: Update your Vite config

In your `vite.config.ts` (or `.js`), import the plugin and apply it:

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
});
```

### Step 3: Import Tailwind in your CSS

In your main stylesheet (for example, `src/style.css`):

```css
@import "tailwindcss";
```

### Step 4: Use Tailwind classes in your HTML

Make sure your compiled CSS is loaded in your HTML or app entry. For example:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/src/style.css" rel="stylesheet" />
    </head>
    <body>
        <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </body>
</html>
```

---

## 🔁 Final Notes

This approach works equally well across both Next.js and Vite projects. If you're using VS Code, make sure you have the Prettier extension installed and your format-on-save settings enabled — it'll take care of sorting the utility classes automatically.

If I find myself doing this more than a couple more times, I'll probably turn it into a template repo. But for now, this guide does the job.

— Karl
