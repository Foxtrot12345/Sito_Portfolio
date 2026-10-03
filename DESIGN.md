---
name: Federico Nebuloni Portfolio
description: A bilingual editorial portfolio with a restrained dark palette and precise interaction accents.
colors:
  bg: "#0a0a0a"
  surface: "#141414"
  border: "#262626"
  strong: "#fafafa"
  text: "#a3a3a3"
  muted: "#858585"
  accent: "#d9823f"
  light-bg: "#fafaf8"
  light-surface: "#fff"
  light-border: "#e6e4df"
  light-text: "#52525b"
  light-muted: "#706b68"
  light-accent: "#a85a2a"
  globe-country: "#31bf6c"
  globe-place: "#f46e60"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(3.05rem, 6.5vw, 5.7rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.2rem, 4vw, 3.4rem)"
    lineHeight: 1.12
    letterSpacing: "-.03em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.35rem"
    lineHeight: 1.2
    letterSpacing: "-.03em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: ".76rem"
    lineHeight: 1.5
rounded:
  subtle: "3px"
  fine: "2px"
spacing:
  narrow-gap: "12px"
  card-pad: "28px"
  section-pad: "105px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.strong}"
    rounded: "{rounded.subtle}"
    padding: "12px 18px"
    height: "47px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.subtle}"
    padding: "12px 18px"
    height: "47px"
  card-explore:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    padding: "31px 28px"
---

# Design System: Federico Nebuloni Portfolio

## Overview

**Creative North Star: "The Editorial Portfolio"**

The site presents work through strong type, measured space, thin rules, and a compact orange accent. Its pages read as a connected collection: a shared header and footer frame hero statements, lists, articles, and links to deeper work. A light theme uses the same hierarchy with reversed neutral roles.

The Globe is an immersive expression within that world. Its dark canvas makes geography dominant, while the existing header, Geist typography, orange interaction state, and fine dividers keep it connected to the rest of the portfolio. Green and red communicate geographic categories on that surface only.

**Key Characteristics:**

- Dark near-black canvas with a near-white foreground and warm orange accents.
- Large, tight Geist headlines paired with smaller Geist Mono metadata.
- Thin dividers, compact corners, generous section spacing, and responsive single-column reading.
- Distinctive interactive work may fill the viewport while retaining the shared site frame.

## Colors

The default theme has a near-black field; the light theme exchanges the neutral values through CSS variables while preserving each role.

### Primary

- **Warm Orange** (`accent`): marks the wordmark slash, active navigation rule, dates, link and button interaction, and focus outlines. Its light-theme counterpart is `light-accent`.

### Neutral

- **Near Black** (`bg`) and **Deep Surface** (`surface`): page and inset panel backgrounds. The light theme uses `light-bg` and `light-surface`.
- **Hairline Border** (`border`): separates panels, rows, the header, and footer. The light theme uses `light-border`.
- **Near White** (`strong`), **Body Gray** (`text`), and **Quiet Gray** (`muted`): heading, body, and low-emphasis roles. In the light theme, `bg` becomes the strong-text value while `light-text` and `light-muted` fill the remaining roles.

**The Semantic Accent Rule.** Orange identifies site identity and interaction. On the Globe, `globe-country` identifies highlighted countries and `globe-place` identifies location pins; those colors remain scoped to geographic meaning.

## Typography

**Display Font:** Geist (sans-serif fallback).
**Body Font:** Geist (sans-serif fallback).
**Label/Mono Font:** Geist Mono (monospace fallback).

**Character:** Bold, tightly tracked headings lead. Regular body copy stays readable, while monospace is reserved for compact metadata, utility links, and map labels.

### Hierarchy

- **Display:** the frontmatter display role describes the home hero. Interior page titles use `clamp(3.1rem, 6vw, 5.3rem)`; the Globe title uses `clamp(3.8rem, 6vw, 6.7rem)` on desktop and `3.5rem` on narrow screens.
- **Headline:** section headings use the headline role; article headings are smaller (`1.7rem`).
- **Title:** card and list headings cluster near the title role, with the exact size adjusted for the component.
- **Body:** regular text uses the body role. Article copy expands to (`1.04rem`, `1.75` line height) inside a (`680px`) reading column.
- **Label:** Geist Mono appears at roughly (`.7rem`–`.78rem`) for metadata, numbered entries, utilities, and the Globe rail.

**The Two-Font Rule.** Keep major statements and reading copy in Geist; use Geist Mono for compact information and controls.

## Layout

The main container caps at (`1120px`) with (`40px`) total viewport subtraction; long-form reading caps at (`680px`). Desktop sections typically have (`105px`) vertical padding, reducing to (`83px`) below (`700px`). Lists and grids use borders as structure, with three or two columns on wide screens and one column where the content needs it on narrow screens.

The shared header is sticky at (`66px`) on desktop and (`54px`) below (`700px`). At that breakpoint, a details-based menu replaces desktop navigation. The Globe itself has a wider (`1600px`) shell: the visualization fills the stage and a (`286px`) rail overlays the right side. Below (`700px`), its copy, stage, and rail stack in that order.

## Elevation & Depth

The site is predominantly flat. Surface contrast and one-pixel borders define most cards and lists. Shadows appear on a few specific objects: the mobile menu (`0 12px 30px #0004`), timeline icons (`0 5px 12px #0004`), and the Globe fallback orb (`inset -35px -25px 70px #090a0a`). The Globe also uses a dark edge gradient to keep overlay text legible.

**The Bordered Surface Rule.** Let borders and tonal changes organize content; reserve shadows for layered objects already evidenced in the build.

## Shapes

Buttons, the mobile menu control, fact strip, and article image frame use subtly rounded (`3px`) corners. Timeline cards use finer (`2px`) corners. Content grids and the Globe rail favor straight edges and rules; map keys and focus markers are circular dots because they encode points or categories.

## Components

### Buttons

- **Outlined action:** subtle corners, a strong border and text, (`12px 18px`) padding, and a (`47px`) minimum height. Hover fills with strong text color and reverses its text to the page background.
- **Ghost action:** the same size and corner treatment with the quiet border and body text; hover adds a surface fill and stronger border.
- **Focus:** links and buttons have a (`2px`) orange outline offset by (`4px`).

### Cards / Containers

- **Explore card:** a flat linked panel with (`31px 28px`) padding, hairline grid edges, a monospace number, a title, and a bottom-aligned link. Hover shifts its fill to the surface color.
- **Profile and journey cards:** surface fills with hairline borders; profile cards use (`27px`) padding and journey cards use (`21px 23px`).

### Navigation

The wordmark uses Geist Mono with an orange slash. Desktop links are small, semibold Geist; the active page gains strong text and a (`2px`) orange bottom rule. The mobile menu uses a bordered square trigger and a raised surface panel. The Globe shares this site frame in both languages.

### Globe focus rail

The rail uses subdued monospace category labels and a fine left divider on desktop. Its full-width focus buttons use (`49px`) minimum row height, fine row rules, a green or red category dot, and orange hover or pressed text. The rail moves below the visualization on narrow screens. A text fallback retains all names when the map cannot load.

## Do's and Don'ts

### Do:

- **Do** preserve the shared header, footer, type families, and semantic orange interaction treatment on new pages.
- **Do** retain the dark and light neutral role mapping when extending shared components.
- **Do** keep custom visualization colors tied to a labeled meaning, as the Globe does with its country and place key.

### Don't:

- **Don't** use the Globe's green and red categories as general site accents.
- **Don't** replace the thin border structure with persistent raised cards across ordinary content pages.
