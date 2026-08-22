# Donghua Central Website

Official website for **Donghua Central** — a community for Chinese animation (donghua) fans featuring handcrafted English subtitles, episode release trackers, discussions, novel/audiobook resources, and the Nine Heavens cultivation RPG server game.

## Tech Stack
This is a zero-dependency static web application designed to load instantly and run directly in the browser:
- **Core**: Semantic HTML5 markup generated via lightweight build partials
- **Styling**: Vanilla CSS3 layout system with dark glassmorphic design variables
- **Logic**: Vanilla ES6 JavaScript (dependency-free)
- **Icons**: Loaded via the Lucide Icon CDN (`unpkg`)
- **Fonts**: Loaded from Google Fonts (`Cinzel`, `Cormorant Garamond`, `Manrope`)
- **Deployment**: Deployed directly to GitHub Pages via GitHub Actions (`static.yml`)

No external bundlers, heavy frameworks, or `node_modules` runtime dependencies required.

## Directory Structure
```
├── .github/workflows/
│   ├── static.yml           # GitHub Actions static deployment workflow
│   └── refresh-tmdb.yml     # Automated TMDB metadata refresh (every 2 hours)
├── data/
│   ├── staff.json           # Curated staff directory
│   ├── series-catalog.json  # Curated series catalog
│   ├── schedule.json        # Release schedule configuration
│   ├── donate.json          # Donation channels configuration
│   ├── donate-perks.json    # Donor perks configuration
│   ├── series.json          # TMDB metadata overlay output
│   └── tmdb-map.json        # Mappings from series IDs to TMDB IDs
├── partials/
│   └── layout.html          # Shared layout template shell
├── pages/
│   ├── home.html            # Home page content fragment
│   ├── schedule.html        # Release schedule fragment
│   ├── library.html         # Series library fragment
│   ├── subtitles.html       # Subtitle process fragment
│   ├── nine-heavens.html    # Nine Heavens RPG fragment
│   ├── staff.html           # Staff roster fragment
│   ├── faq.html             # FAQ section fragment
│   ├── donate.html          # Donate section fragment
│   ├── terms.html            # Terms of Republishing fragment
│   └── about.html           # About section fragment
├── scripts/
│   ├── build-pages.mjs      # Zero-dependency page generator
│   └── fetch-tmdb.mjs       # TMDB metadata sync script
├── assets/                  # Images, banners, logos, and video assets
├── 404.html                 # Custom themed 404 page
├── index.html               # Generated home page
├── schedule.html            # Generated schedule page
├── library.html             # Generated library page
├── subtitles.html           # Generated subtitles page
├── nine-heavens.html        # Generated Nine Heavens page
├── staff.html               # Generated staff page
├── faq.html                 # Generated FAQ page
├── donate.html              # Generated Donate page
├── terms.html               # Generated Terms page
├── about.html               # Generated About page
├── manifest.json            # Web App Manifest config
├── robots.txt               # Crawler indexation guidelines
├── sitemap.xml              # Generated sitemap
├── schedule.ics             # Generated iCal schedule feed
├── script.js                # Shared client-side interaction script
├── donate.js                # Client-side donation & perks loader
├── about.js                 # Client-side working-on loader
└── styles.css               # Shared glassmorphic stylesheet
```

## Local Development & Building
1. Clone the repository:
   ```bash
   git clone https://github.com/shridhuu/Donghua-Central.git
   ```
2. Build the static `.html` pages, `sitemap.xml`, and `schedule.ics`:
   ```bash
   node scripts/build-pages.mjs
   ```
3. Open `index.html` (or any generated `.html` file) directly in your browser, or use a local development server like **Live Server** in VS Code.

## Editing Dynamic Data

### 1. Adding/Editing Staff Members
Staff data is stored in `data/staff.json`. Add or edit items using this schema:
```json
{
  "name": "Staff Name",
  "role": "Staff Role / Title",
  "bio": "Short bio or description.",
  "avatar": "Direct link to Discord avatar image",
  "discord": "@discord_username"
}
```
*Note: Always use persistent CDN avatar links (`https://cdn.discordapp.com/avatars/{id}/{hash}`).*

### 2. Adding/Editing Series in Catalog
Series catalog data is stored in `data/series-catalog.json`. Add or edit items using this schema:
```json
{
  "id": "unique-series-id",
  "name": "Series Name",
  "image": "https://image.tmdb.org/t/p/original/...",
  "width": 1024,
  "height": 1024,
  "status": "Ongoing",
  "episodes": "1+",
  "genres": ["Cultivation", "Action"],
  "synopsis": "Brief description of storyline.",
  "currentlyWorkingOn": true,
  "workingOnNote": "from Episode 1"
}
```
*Note: Client-side dynamic rendering fetches `data/staff.json` and `data/series-catalog.json` automatically at runtime.*

### 3. Adding/Editing Donation Methods
Donation channels are stored in `data/donate.json` and rendered by `donate.js` on `donate.html` — add, edit, or remove a channel by editing this file, no HTML changes needed. Schema:
```json
{
  "id": "unique-method-id",
  "label": "Display Name",
  "icon": "lucide-icon-name",
  "type": "copy",
  "value": "The address, handle, or URL",
  "cta": "Button text (only used when type is \"link\")"
}
```
*Note: `type` is either `"copy"` (renders a click-to-copy button, for wallet addresses/handles) or `"link"` (renders an outbound button using `cta` as its label, for Ko-fi/PayPal/Discord-style links).*

### 4. Adding/Editing Donor Perks
Donor perks are stored in `data/donate-perks.json` and rendered by `donate.js` on `donate.html`. Schema:
```json
{
  "title": "Perk Title",
  "description": "Short perk description.",
  "icon": "lucide-icon-name"
}
```

## TMDB Metadata Integration Pipeline

The series library integrates with **The Movie Database (TMDB)** to periodically pull updated details (such as ratings and episode counts) without adding client-side API keys or network latency.

### 1. Structure
- **Mapping File (`data/tmdb-map.json`)**: Configures mappings between local series IDs and TMDB IDs.
- **Data Output (`data/series.json`)**: Formatted data containing ratings, episodes, and statuses fetched from TMDB, merged by the client script.
- **Fetch Script (`scripts/fetch-tmdb.mjs`)**: Node script executing local or CI fetch tasks.

### 2. Local Execution
1. Obtain a **Read Access Token** or **API Key** from TMDB.
2. Define the token in your local shell environment:
   - **PowerShell**: `Set-Content env:TMDB_TOKEN 'your_tmdb_token_here'`
   - **Bash/Command Line**: `export TMDB_TOKEN="your_tmdb_token_here"`
3. Run the script from the root directory:
   ```bash
   node scripts/fetch-tmdb.mjs
   ```

### 3. Automatic Updates
A GitHub Actions workflow (`.github/workflows/refresh-tmdb.yml`) is scheduled to run the script every 2 hours, committing updates directly to `data/series.json` only when something actually changed.
