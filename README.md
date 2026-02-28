# Design System Builder

An interactive design system configurator. Pick a theme, button style, input style, and card style — see everything update live, then export your tokens as JSON, CSS variables, or a Tailwind config.

## Features

- 20 pre-built themes (10 dark, 10 light)
- 10 button variants, 5 input styles, 5 card styles
- Live preview with real UI components
- Export as JSON tokens, CSS variables, or Tailwind config

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` automatically deploy to GitHub Pages via the included Action.

Before the first deploy:
1. Go to your repo **Settings → Pages → Source** and select **GitHub Actions**
2. If your repo name differs from `design-chooser`, update `base` in [vite.config.js](vite.config.js)
