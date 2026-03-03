# RevuHub (Astro Blog)

This is an **Astro + React + Tailwind** blog website.

## Where the content comes from

- **Primary source**: a Supabase table named `articles`.
- **Authoring/automation**: your **n8n workflow** generates/updates content and writes it into Supabase.
- **Fallback**: if Supabase environment variables are not configured, the site falls back to local mock data in `src/lib/mock-data.ts`.

## Tech stack

- Astro 5
- React
- Tailwind CSS
- Supabase (content database)

## Environment variables

Create a `.env` file locally (do not commit secrets). This project uses **public** Supabase variables:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

On **Vercel**, set the same variables in:

- Project Settings
- Environment Variables

## Local development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

## Deploy to Vercel

This project is **ready to deploy to Vercel**.

1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Configure build settings (Vercel usually auto-detects Astro):

- Build Command: `npm run build`
- Output Directory: `dist`

4. Add environment variables in Vercel:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

### Notes

- If you deploy **without** configuring Supabase env vars, the site will still build and run, but it will show **mock articles** instead of live content.
- Your n8n workflow should keep Supabase `articles` updated so the website content stays fresh.
