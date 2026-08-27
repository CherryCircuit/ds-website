# DuraSleeve Website

Marketing site for DuraSleeve (B2B industrial wear-sleeve brand). Built with Vite, deployed to GitHub Pages.

## Live
Deployed from the `main` branch, served at the repo's GitHub Pages root (`https://cherrycircuit.github.io/ds-website/`).

## Source
Source lives at `~/Hermes/Runtime/projects/durasleeve-website/` (Vite project). Build with:
```bash
npm install
npm run build   # outputs to dist/
```
Configure Supabase before building via `.env` (see `.env.example`).

## Pages
- `/index.html` — Home
- `/products.html` — Sizing lookup (imperial, client-side)
- `/history.html` — Brand lineage history (the **only** page naming Speedi-Sleeve)
- `/proof.html` — Real-world test + case studies
- `/ig.html` — Instagram-ad landing page
- `/contest.html` — Repair contest (photo + email + comment, Supabase-backed)

## History
- `old-site-archive` branch: the previous static site (WordPress snapshot). Preserved.
