# Portfolio: Earl Martin Sioson

The source for my personal site. It covers my DevOps and cloud work, my experience, certifications and side projects.

**Live:** https://earl-sioson-devops-engineer.vercel.app

## Stack

React 19 and Vite 8, styled with Tailwind CSS 4 and deployed on Vercel. Everything lives in one file and there's no backend.

## Run it locally

```bash
npm install
npm run dev
```

## Edit the content

All the text is in data constants at the top of [`src/App.jsx`](src/App.jsx), so updating the site doesn't mean touching the layout:

| Constant | Section |
|---|---|
| `SKILLS` | Skills grid |
| `PROJECTS` | Selected work |
| `LAB_FEATURED`, `LAB` | Side projects |
| `AI_SKILLS` | AI automation |
| `EXPERIENCE` | Work history |
| `CERTS` | Certifications |
| `STATS` | Headline numbers |
