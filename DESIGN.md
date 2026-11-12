---
name: Donghua Central Design System
description: Xianxia mysticism meets modern high-utility catalog and release tracker
colors:
  background: "#030826"
  panel-bg: "#11172e"
  surface-card: "#1e2135"
  spirit-accent: "#8aa3c7"
  gold-highlight: "#d6a84d"
  ink-text: "#eff5ff"
  muted-text: "#b7c1d3"
  dim-text: "#858da2"
  line-border: "rgba(239, 245, 255, 0.17)"
  gold-border: "rgba(214, 168, 77, 0.35)"
typography:
  display:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  lore-heading:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.gold-highlight}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.sm}"
    padding: "10px 18px"
  card-panel:
    backgroundColor: "{colors.panel-bg}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.md}"
    padding: "20px"
---

# Design System: Donghua Central

## Overview
Donghua Central's visual design combines the timeless, atmospheric grandeur of ancient cultivation lore (Xianxia) with the precision and responsiveness of a modern digital media hub. It serves fans tracking weekly episode releases, reviewing handcrafted English subtitles, exploring the series library, and advancing in the Nine Heavens cultivation server RPG.

## Colors
The palette balances deep celestial night tones with ethereal spirit blue and antique gold radiance:
- **Background (`#030826`)**: Deep celestial obsidian evoking midnight cultivation beneath starlight.
- **Panel / Surface (`#11172e`, `#1e2135`)**: Layered inkstone panels providing contrast without harshness.
- **Spirit Accent (`#8aa3c7`)**: Ethereal cyan-blue used for links, badges, and focus rings.
- **Gold Highlight (`#d6a84d`)**: Antique spiritual gold reserved for high-stakes breakthrough states, primary calls-to-action, donor perks, and QC badges.
- **Text & Hierarchy**: Crisp ink white (`#eff5ff`) for primary headings, silver mist (`#b7c1d3`) for body copy, with dim text bumped to meet WCAG AA contrast standards (>= 4.5:1).

## Typography
Three intentional typographic tiers:
- **Display (`Cinzel`)**: Classical Roman/inscriptional serif for dramatic hero headers, series titles, and realm milestones.
- **Lore & Verse (`Cormorant Garamond`)**: Elegant humanist serif for epigraphs, cultivation kickers, and narrative lore context.
- **Interface & Body (`Manrope`)**: Highly legible geometric sans-serif for dense schedule charts, episode counts, countdowns, and metadata.

## Elevation
- **Card Depth**: Layered backdrop surfaces with subtle 1px border lines (`rgba(239, 245, 255, 0.17)`), avoiding exaggerated 32px+ drop shadows.
- **Spiritual Glow**: Soft ambient radial highlights at key focal points (hero badge, breakthrough trigger).
- **Z-Index System**:
  - Base: 0
  - Sticky Headers: 20
  - Dropdowns & Popovers: 50
  - Modals & Overlays: 100
  - Toasts / Notifications: 200

## Components
- **Buttons**:
  - *Primary Gold*: Solid `#d6a84d` fill with `#030826` bold ink, subtle 2px transform on hover, distinct 1px inset depression on active press.
  - *Ghost / Outline*: Crisp 1px spirit border with subtle glow and background tint on hover.
- **Cards**: Clean 10px rounded boundaries, never side-striped with 3px border accents.
- **Release Badges**: Time-relative countdown badges (`Today`, `In 2h`, `Aired`) with high contrast status color coding.
- **Filter Chips**: Tactile pill toggles with visible keyboard focus rings and active highlight states.

## Do's and Don'ts
### Do's
- Pair Cinzel headings with Cormorant Garamond subheads and Manrope body copy.
- Keep contrast on all body and metadata text above 4.5:1 against the dark background.
- Animate height using CSS Grid (`grid-template-rows: 0fr -> 1fr`) or opacity/transform; never animate layout `height` directly.
- Show concrete visual proof of subtitle translation quality through comparison sliders.

### Don'ts
- Never use 3px side-tab border-left/border-right accents on cards or callouts.
- Never place tracked uppercase `<p class="eyebrow">` kickers above every single section.
- Never use generic gradient text or frosted-glass blur as an excuse for poor legibility.
- Never animate layout properties that cause reflow or frame drops.

