# [riquelmy.dev](https://riquelmy.dev) - Personal Portfolio and Technical Blog

A static portfolio site and technical blog built with Astro 5, MDX, and Tailwind CSS 4. Deployed to Firebase Hosting.

## Tech Stack

- **Framework**: Astro 5 (static output)
- **Content**: MDX with Astro Content Collections and Zod schema validation
- **Styling**: Tailwind CSS 4 via Vite plugin, with `@tailwindcss/typography`
- **Syntax highlighting**: Shiki (github-dark theme)
- **Deployment**: Firebase Hosting

## Local Development

### Prerequisites

- Node.js 20+ and npm
- Firebase CLI (for deployment only): `npm install -g firebase-tools`

### Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

```bash
# Build the static site
npm run build

# Preview the production build locally
npm run preview
```

The output is written to the `dist/` directory.

## Deployment

### Firebase Hosting

1. Update the project ID in `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "your-actual-project-id"
     }
   }
   ```

2. Update the `site` URL in `astro.config.mjs` with your production domain.

3. Build and deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Content Authoring

### Adding a Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Article Title"
description: "A brief description of the article."
date: 2026-01-15
tags: ["python", "data-science"]
draft: false
---

Your content here. You can use MDX components like:

import Callout from '@components/Callout.astro';

<Callout type="tip">
  This is a tip callout.
</Callout>
```

Supported frontmatter fields:

| Field         | Type       | Required | Default |
|---------------|------------|----------|---------|
| `title`       | string     | yes      | --      |
| `description` | string     | yes      | --      |
| `date`        | date       | yes      | --      |
| `tags`        | string[]   | yes      | --      |
| `draft`       | boolean    | no       | false   |

### Adding a Project

Create a new `.mdx` file in `src/content/projects/`:

```mdx
---
title: "Project Name"
description: "What the project does."
stack: ["Python", "Docker", "PostgreSQL"]
githubUrl: "https://github.com/you/project"
liveUrl: "https://project.example.com"
featured: true
---

Optional longer description rendered on the projects page.
```

Supported frontmatter fields:

| Field         | Type       | Required | Default |
|---------------|------------|----------|---------|
| `title`       | string     | yes      | --      |
| `description` | string     | yes      | --      |
| `stack`       | string[]   | yes      | --      |
| `githubUrl`   | string     | no       | --      |
| `liveUrl`     | string     | no       | --      |
| `featured`    | boolean    | no       | false   |

## Project Structure

```
src/
  components/       # Reusable Astro components
  content/
    blog/           # MDX blog posts
    projects/       # MDX project entries
  layouts/          # Page layouts (Base, Article)
  pages/            # File-based routing
  styles/           # Global CSS (Tailwind)
  utils/            # Helper functions
  content.config.ts # Content collection schemas
public/             # Static assets
firebase.json       # Firebase Hosting config
astro.config.mjs    # Astro configuration
```

## Features

- Dark mode default with light mode toggle
- Tag-based article filtering
- Table of contents for long articles
- Previous/next article navigation
- RSS feed at `/rss.xml`
- Auto-generated sitemap
- SEO: Open Graph tags, canonical URLs, meta descriptions
- Responsive, mobile-first design
- Syntax highlighting with Shiki
- Zero client-side JS except theme toggle and mobile menu
