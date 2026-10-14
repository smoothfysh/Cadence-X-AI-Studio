<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CADENCE-X — The Rhythm of Product Development

Cadence-X is an interactive product development cadence framework and independent software studio portfolio harmonizing agile sprint loops, continuous release trains, team rituals, strategic horizons, and focused web tools.

---

## How to Test Locally

### Option 1: Instant Python Server (Recommended, No Setup Needed)
Since Python is available on your machine, you can instantly serve the static site (including `apps.html`, `about.html`, and `otisplay/`):

```bash
# In your project root folder:
python -m http.server 3000 --directory public
```

Then open your browser to:
- **Apps & Experiments**: [http://localhost:3000/apps.html](http://localhost:3000/apps.html)
- **Home**: [http://localhost:3000/](http://localhost:3000/)
- **About**: [http://localhost:3000/about.html](http://localhost:3000/about.html)
- **Otis Play**: [http://localhost:3000/otisplay/](http://localhost:3000/otisplay/)

*(Press `Ctrl + C` in your terminal when you want to stop the server).*

---

### Option 2: Full React / Vite Development Workflow
If you want to run the full Vite dev server:

```bash
# 1. Install dependencies:
npm install

# 2. Start Vite dev server:
npm run dev
```

Then open:
- [http://localhost:3000/apps.html](http://localhost:3000/apps.html)

---

### Option 3: Direct File Opening
Because `public/apps.html` is a standalone static document using Google Fonts and relative assets, you can also double-click `public/apps.html` in Windows File Explorer or run in PowerShell:

```powershell
Start-Process "public\apps.html"
```

---

## Art Direction System (`/apps`)

The Cadence-X `/apps` page has been redesigned as an **editorial, independent software studio portfolio** rather than a generic SaaS marketing template. The aesthetic is intentional, human, understated, and distinctive.

### 1. Color Palette

| Token | Value | Role |
| :--- | :--- | :--- |
| **Page Background** | `#FAF8F5` | Warm ivory/off-white (replaces cold grays) |
| **Surface Card** | `#FFFFFF` | Crisp neutral base for preview frames & modal |
| **Primary Text** | `#0F172A` | Deep navy / near-black for high contrast readability |
| **Secondary Text** | `#475569` | Muted slate for body descriptions |
| **Action Accent** | `#1D4ED8` | Cobalt blue for primary buttons, active links, and highlights |
| **Editorial Accent**| `#C2410C` | Muted terracotta for section numbers, eyebrow dots, and tags |
| **Subtle Dividers** | `#E8E4DA` | Warm-gray hairline rules separating sections |

> **Principle**: Color is used sparingly for functional hierarchy. No arbitrary gradients, heavy drop shadows, neon glow, or nested card borders.

---

### 2. Typography

- **Editorial Serif (`Newsreader`)**:
  - Used for large headlines, titles, and modal headers.
  - Sizing: `clamp(2.1rem, 5.5vw, 4.25rem)` on hero, `clamp(2.5rem, 4.5vw, 3.25rem)` on project titles.
  - Features high-contrast optical sizing (`opsz`) and delicate italics (`em`).
- **Clean Body Sans (`Hanken Grotesk`)**:
  - Used for body text, narrative blocks, and navigation links.
  - Set at comfortable reading sizes (16–18px) with relaxed 1.6–1.65 line height.
- **Monospace Metadata (`JetBrains Mono`)**:
  - Used for small uppercase eyebrows (`APPS & EXPERIMENTS`, `FEATURED PRODUCT`, `EXPERIMENT / 02`, `EXPERIMENT / 03`), preview tabs, and technical tags.
  - Letter-spacing: `0.14em`.
- **Brand Lockup (`Archivo Black`)**:
  - Preserved strictly for the header `CADENCE-X` wordmark.

---

### 3. Layout & Structure

- **Header & Footer Integrity**:
  - The shared site header (80px height, spinning dual-ring core logo, navigation links) and footer (copyright with blue status dot, links) remain identical to the main site.
- **Hero**:
  - Left-aligned editorial introduction:
    - Eyebrow: `APPS & EXPERIMENTS`
    - Headline: *"Small tools. Thoughtfully made."*
    - Description: *"I build focused web tools to help with real work, one project at a time."*
- **Featured Product (Roadmap)**:
  - Asymmetric two-column desktop layout.
  - Left: Product overview, two-decade craft narrative, primary CTA `Launch Roadmap Tool →`, and secondary action `Learn more` triggering the native feature capabilities modal.
  - Right: Device frame preview featuring real screenshots with an interactive tab switcher (**`Board View`** vs. **`Timeline (Gantt)`**).
- **Experiments Section (Play & Utility)**:
  - Distinct, non-uniform layouts for the two side projects:
    - **Otis Play (`EXPERIMENT / 02`)**: Warm, sunny tactile sandbox with copy on the left and playful pastel mini-game tiles (`Shape Sorter`, `Color Splash`, `Shape Pop`, `Count & Drop`) on the right.
    - **Timer App (`EXPERIMENT / 03`)**: Dark, focused precision interface with the glowing cyan radial dial, countdown digits, and preset interval buttons on the left, and copy on the right.
- **Quiet Studio Colophon / Coffee Support**:
  - Preserved exact message: *"Cadence–X is an independent collection of projects, but it takes ongoing care and hosting to keep everything running smoothly. If you enjoy these apps and would like to support future work, you can buy me a coffee below."*
  - Replaced the loud, floating yellow button with an understated studio patronage card: `☕ Support on Buy Me a Coffee ↗`.

---

## Homepage Art Direction & Architecture

The Cadence-X homepage brings the editorial studio visual language to the core site:

1. **Editorial Two-Column Hero**:
   - **Left Column**: Features the large, authentic Cadence-X spinning rhythm core logo (`SpinningLogo`), wordmark with cobalt-blue em-dash, and the tagline *"The Rhythm of Product Development"*.
   - **Vertical Hairline Divider**: Subtle rule separating the studio brand from executive services on desktop.
   - **Right Column**: Left-aligned consultation offering (*"When You Need It."*), narrative, `Book a Consultation →` CTA, and a whimsical handwritten note (*"Strategy. Execution. Impact."*).
   - **Mobile Layout**: Stacks naturally without clipping the spinning logo or disrupting rotation animation.

2. **Strictly Preserved Multi-Track Tempo Waveform**:
   - The interactive canvas visualizer (`TempoVisualizer`) harmonizing sprint loops, continuous release trains, team rituals, and strategic horizons remains completely untouched, running its live rendering loop with harmonic alignment nodes.

3. **Executive Services ("How We Can Partner")**:
   - Deep midnight navy container (`#080D1A`) with subtle border, refined typography, and whimsical handwritten script note (*"Better teams. Better products."*).
   - 4 streamlined service columns (Interim CPO, Product Advisory, Product Consulting, Proven Expertise) with generous spacing and reduced card clutter.

4. **Apps & About Me Studio Links**:
   - Open, editorial two-column layout with center vertical hairline divider.
   - Left: Apps overview, bullet list, `Open Apps →`, and botanical branch doodle.
   - Right: About Me summary, bullet list, `Go to About Me →`, and terracotta `///` doodle.

---

## About Me Page Art Direction (`/about.html`)

The Cadence-X About Me page has been redesigned to match the studio portfolio art direction:

1. **Top Introduction & Full Name**:
   - **Full Name Heading**: Uses the requested full name: *"Hi, I’m Anushka Jayawardana."* in editorial serif (`Newsreader`).
   - **Cycling Portrait**: Preserves the circular portrait avatar with smooth transitions between the three artistic portrait styles.
   - **Narrative Lead**: Product person by trade, engineer by training, with 20+ years of software delivery.

2. **Two-Column Editorial Spread**:
   - **Left Column ("The Quick TL;DR Version About Me")**:
     - JetBrains Mono uppercase eyebrow in cobalt blue.
     - Open, unboxed narrative detailing two decades of software design across mobile, e-commerce, martech, and digital real estate.
     - Clean traits summary card highlight (*"Passionately curious | Strangely enjoy babysitting chaos | Obsessed with solving customer problems | Nerd at heart | Product Strategist | Advisor and Consultant"*).
     - Direct contact links: `Send this guy an email` and `Check out his LinkedIn`.
     - Delicate botanical branch doodle anchored at the bottom-left.
   - **Right Column ("Professional Milestones")**:
     - Editorial serif section header: `PROFESSIONAL MILESTONES`.
     - Clean cobalt blue vertical timeline with interactive alternating career cards (Barco, Domain Dynamics, Sharp, Spreadshirt, Selligent, Infobip, Aviv Group, Bind Technologies).
     - Horizontal connector lines tethering cards to timeline nodes.
     - International flag icons rendered cleanly across all platforms.
     - Cobalt indicator rings for active leadership roles.
     - Terracotta handwritten `///` doodle anchored at the bottom-right.