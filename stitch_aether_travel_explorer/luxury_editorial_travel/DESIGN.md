---
name: Luxury Editorial Travel
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c0c7d5'
  on-secondary: '#2a313c'
  secondary-container: '#454c58'
  on-secondary-container: '#b5bcca'
  tertiary: '#c4cfe2'
  on-tertiary: '#273140'
  tertiary-container: '#a9b3c6'
  on-tertiary-container: '#3b4555'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#dce3f2'
  secondary-fixed-dim: '#c0c7d5'
  on-secondary-fixed: '#151c27'
  on-secondary-fixed-variant: '#404753'
  tertiary-fixed: '#d9e3f7'
  tertiary-fixed-dim: '#bdc7db'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4757'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter-sm: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin-screen: 2rem
  column-max-w: 1200px
---

## Brand & Style

This design system embodies a sophisticated, immersive aesthetic tailored for high-end editorial travel. The visual narrative balances timeless literary elegance with modern digital luxury. 

- **Brand Personality:** Sophisticated, worldly, exclusive, and serene.
- **Target Audience:** Discerning travelers seeking curated, high-end experiences, bespoke itineraries, and immersive travel journalism.
- **Emotional Response:** A sense of anticipation, calm luxury, inspiration, and quiet confidence.
- **Design Style:** A refined synthesis of dark mode minimalism and glassmorphism. It relies on deep obsidian backgrounds, translucent frosted glass layers, luminous warm copper/gold accents, and generous whitespace to let breathtaking photography take center stage.

## Colors

The color palette is deliberately restrained, designed to recede and allow immersive imagery and golden accents to command attention. 

- **Primary Accent:** Warm Metallic Gold (`#D4AF37`) used sparingly for key interactive elements, active states, and editorial highlights.
- **Secondary Surfaces:** Deep Slate (`#1E2530`) utilized for elevated cards and structural containers.
- **Tertiary Elements:** Muted Charcoal Blue (`#3A4454`) for subtle borders and secondary iconography.
- **Neutral Background:** Deep Obsidian (`#0B0F19`) serving as the foundational canvas for the dark mode experience.
- **Text & Contrast:** High-legibility off-white (`#F3F4F6`) for primary body text and muted silver (`#9CA3AF`) for secondary captions.

## Typography

Typography acts as the primary editorial voice, pairing high-contrast, literary serif headlines with clean, highly legible sans-serif body text.

- **Headlines:** Set in Playfair Display, bringing timeless elegance and editorial authority to destinations, titles, and pull quotes.
- **Body & UI:** Set in Inter, ensuring crisp readability across dense itineraries, metadata, and long-form travel journalism.
- **Scale & Adaptation:** Headlines scale gracefully. For mobile viewports, large display sizes (above 32px) must step down using fluid typography rules to prevent awkward wrapping, maintaining comfortable line lengths (45–75 characters) for body copy.

## Layout & Spacing

The layout follows a fluid editorial grid designed to showcase cinematic imagery and immersive storytelling. 

- **Grid System:** A 12-column responsive grid with generous 24px–32px gutters on desktop, collapsing to 16px margins on mobile devices. Content containers are capped at a maximum width of 1200px to maintain reading comfort.
- **Whitespace:** Generous vertical rhythm and padding reinforce the aura of exclusivity and calm luxury. Avoid crowding elements; allow cards, imagery, and typography to breathe.
- **Breakpoints:** 
  - Mobile: `< 640px` (single column, edge-to-edge imagery with overlaid typography).
  - Tablet: `640px – 1024px` (two-column asymmetrical layouts).
  - Desktop: `> 1024px` (multi-column editorial spreads with precise alignment).

## Elevation & Depth

Depth is established primarily through sophisticated glassmorphism and subtle tonal layering rather than harsh drop shadows.

- **Glassmorphism Layers:** Floating navigation bars, image captions, and interactive cards utilize semi-transparent deep slate surfaces (`rgba(30, 37, 48, 0.75)`) paired with high-end backdrop blur (`blur(16px)`) and delicate 1px border highlights (`rgba(212, 175, 55, 0.2)`).
- **Ambient Lighting:** Shadows are extremely diffused, low-opacity, and tinted with the warm copper/gold palette to simulate soft ambient light reflecting off dark surfaces.
- **Z-Index Hierarchy:** Base background (`0`), standard content (`10`), floating glass navigation/action bars (`50`), modal overlays (`100`).

## Shapes

The shape language is refined and understated, utilizing soft curves that feel intentional and polished without leaning into casual or playful territories.

- **Base Radius:** UI containers, buttons, and image cards utilize a subtle `0.25rem` to `0.5rem` corner radius.
- **Pill Elements:** Category tags, destination badges, and filter chips use fully rounded pill shapes (`9999px`) to contrast cleanly against rectangular content cards.
- **Borders:** Structural dividers and card outlines are whisper-thin (1px) using muted borders with low opacity, occasionally shifting to warm gold on hover or active states.

## Components

- **Buttons:** Primary actions feature solid warm gold (`#D4AF37`) backgrounds with deep obsidian text, featuring a subtle scale transition on hover. Secondary and ghost buttons utilize frosted glass backgrounds with gold borders and off-white text.
- **Cards (Destinations & Articles):** Immersive edge-to-edge imagery topped with subtle gradient protection overlays, paired with frosted glass content containers for titles, locations, and reading times.
- **Chips & Tags:** Pill-shaped elements with semi-transparent dark backgrounds, delicate borders, and small uppercase labels indicating travel categories (e.g., "Bespoke," "Gastronomy," "Sanctuary").
- **Input Fields:** Minimalist text inputs featuring deep slate backgrounds, transparent borders that glow gold on focus, and placeholder text in muted silver.
- **Checkboxes & Radio Buttons:** Custom-styled square and circular selectors with clean gold accent fills when checked, maintaining high contrast against dark mode surfaces.
- **Lists & Itineraries:** Structured timeline lists utilizing thin vertical gold accent lines to map out multi-day travel itineraries.
- **Additional Components:** Full-screen immersive photo galleries, interactive destination maps with custom gold map markers, and slide-over booking drawers utilizing high-blur glassmorphism.