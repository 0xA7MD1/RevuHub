# RevuHub

Automated, SEO-friendly content publishing powered by **n8n + AI**, delivered as a fast **Astro** blog.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B2230)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Automation-EA4B71?logo=n8n&logoColor=white)
![AI](https://img.shields.io/badge/AI-Content_Generation-111827)

- **Live site**: [https://revuhub.vercel.app/](https://revuhub.vercel.app/)

## Problem & solution (why I built this)

Publishing high-quality articles consistently is hard: it’s time-consuming, error-prone, and typically requires hopping between tools (research, writing, editing, formatting, CMS publishing).

RevuHub turns content creation into a repeatable pipeline:

- **Automation-first authoring** with **n8n** orchestrating the workflow.
- **AI-generated drafts** that can be refined and re-run.
- **Structured storage** in **Supabase** so the frontend can render pages reliably.
- **Fast static delivery** via **Astro**, with a safe **mock-data fallback** for development and deployments.

The result: a blog that’s easy to keep fresh, scalable for multiple categories/languages, and optimized for performance.

## Key features

- **End-to-End AI Pipeline**: A fully automated n8n workflow that handles ideation, research, writing, localization, and database syncing.
- **Semantic Web Research**: Integrates with **Exa AI** to fetch highly technical, up-to-date context before writing.
- **Bilingual SEO Content**: Uses **Google Gemini** agents to generate structured MDX articles in English, and fully translates them into Arabic while preserving code blocks and custom UI components.
- **Automated Media Sourcing**: Dynamically queries the **Unsplash API** using AI-generated keywords to attach relevant landscape cover images.
- **Supabase-backed content model**: Content lives in a dedicated `articles` table (with indexes and public read policy).
- **Resilient local/dev experience**: If Supabase env vars aren’t set, the site safely uses local mock content in `src/lib/mock-data.ts`.
- **Modern frontend stack**: Astro + React components with Tailwind for fast, accessible UI.

## Architecture / how it works

High-level flow:

```text
Exa AI + Unsplash
   |
   v
n8n (Workflow orchestration & Gemini AI Agents)
   |
   v
Supabase (PostgreSQL 'articles' table)
   |
   v
Astro site (Fetch + render)
   |
   v
Static output (dist) + CDN
The core of RevuHub is a complex n8n orchestration engine that runs without human intervention. Here is the step-by-step data flow:

Topic Generation & Prompting: A JavaScript node selects a technical category (e.g., Cybersecurity, Software Engineering) and generates a semantic search prompt.

Context Gathering: The workflow queries the Exa API, parses the results, cleans the text, and sorts by relevance score.

Content Generation: A LangChain Gemini Agent processes the research and writes a highly detailed, zero-fluff article in Markdown/MDX, including specific SEO metadata.

Media Fetching: The agent generates a visual keyword, which is sent to Unsplash to fetch a high-quality cover image.

Localization (Arabic Translation): A secondary AI Agent translates the English payload to Arabic, strictly preserving MDX tags (<callout>, <highlight>, etc.) and formatting.

Data Validation & Supabase Sync: The final English and Arabic payloads are merged, validated, and pushed as a new row to the Supabase database.

Frontend Delivery: The Astro frontend fetches the fresh data and statically generates the fast, SEO-optimized blog pages.

Tech stack
Frontend
Astro 5

React

Tailwind CSS

Backend / database
Supabase (Postgres)

Automation / AI
n8n (workflow automation)

LangChain AI Agents (Google Gemini, Exa AI)

Environment variables
Create a .env file locally (do not commit secrets). This project uses public Supabase variables:

PUBLIC_SUPABASE_URL

PUBLIC_SUPABASE_ANON_KEY

On Vercel, set the same variables in:

Project Settings

Environment Variables

Local development
Install dependencies:

Bash

npm install
Run the dev server:

Bash

npm run dev
Build for production:

Bash

npm run build
Preview the production build locally:

Bash

npm run preview
Deployment (Vercel)
This project is ready to deploy to Vercel.

Push the repo to GitHub.

Import the repo in Vercel.

Configure build settings (Vercel usually auto-detects Astro):

Build Command: npm run build

Output Directory: dist

Add environment variables in Vercel:

PUBLIC_SUPABASE_URL

PUBLIC_SUPABASE_ANON_KEY