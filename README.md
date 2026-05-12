# Smith Family Tree
### Genealogical Record & Bells of Memory Worldbuilding Archive

A React application for exploring the Smith family genealogy with an integrated
worldbuilding layer for the *Bells of Memory* creative project.

---

## Getting Started

### Option 1: Claude Code (recommended)
Open this folder in Claude Code and ask it to run the project.

### Option 2: Manual setup
```bash
npm install
npm run dev
```
Then open http://localhost:5173 in your browser.

---

## Features

- **Navigate tab** — Filmstrip-style family navigator with 5 responsive rows:
  - Grandparents (NAV row, half height)
  - Parents (full row)
  - Your generation — focus person, siblings, spouses in birth order
  - Children (full row)
  - Grandchildren (NAV row, half height)
- **Tree tab** — Visual ancestor/descendant canvas
- **Search** — Full-text search across all 253 individuals
- **Edit** — Genealogical record editing (name, dates, places)
- **Lore** — Bells of Memory worldbuilding layer per person
  - Essence states: Precessor, Vitalcestor, Cestor, Celestor, Voidcestor, Void Essence
  - Novel title, role, institutional affiliation, story status, notes
- **Focused Information Panel** — Collapsible right-side panel, toggles between
  full panel and slim strip
- **Persistent storage** — Changes saved via window.storage API
- **Add relatives** — Attach new people as child, parent, spouse, or sibling

---

## Data

253 individuals from the Smith GEDCOM file are embedded directly in the app.
Key lineages:
- **Smith** (paternal Colorado line)
- **Swisher** (paternal)
- **Kuta** (maternal, Polish immigrant line)
- **Holvoet / Verraest** (maternal, Belgian immigrant line)

---

## Architecture

Single-file React component (`src/App.jsx`) with:
- Embedded GEDCOM-derived JSON data
- No external API dependencies
- window.storage for persistence (Claude.ai artifact environment)
- Vite for local development

---

## Version History
- v1 — Basic GEDCOM viewer
- v2 — Visual tree canvas + dual-layer editing (record + lore)
- v3 — Collapsible outline view
- v4 — Filmstrip navigator with responsive grid, Focused Information Panel
