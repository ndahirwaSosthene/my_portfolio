# About Me Page Redesign - Implementation Plan

## Overview
Redesign the About Me page with GSAP ScrollTrigger parallax animations connecting 4 new sections, while preserving the existing Experience section.

## Architecture
- Break monolithic `About.jsx` into modular section components under `src/components/AboutSections/`
- Hero + Bio share a single pinned container (the photo morphs between them)
- Skills section has two animation phases (fan + carousel) under one pin
- Experience section extracted as-is
- Custom About Footer (page-specific, different from global Footer)

## Implementation Steps

### Step 1: Tailwind Config
- Add `serif: ['Playfair Display', ...]` font family
- Add accent color `#F9670E`

### Step 2: Create `src/components/AboutSections/HeroBioSection.jsx`
- Sections 1+2 in a single pinned container
- Photo is a single DOM element that morphs (scale, borderRadius)
- Dark overlay fades in, hero content fades out, bio content fades in
- Total scroll height: ~250vh, scrub: 1.5

### Step 3: Create `src/components/AboutSections/SkillsSection.jsx`
- Section 3: 7 skill cards with fan-out + horizontal carousel
- Phase A (0-20%): text cascade in
- Phase B (20-37%): cards fan out from center to arc positions
- Phase C (37-57%): hold
- Phase D (57-74%): de-rotate, align horizontally
- Phase E (74-100%): horizontal scroll drive
- Total scroll height: ~350vh, scrub: 1.5

### Step 4: Create `src/components/AboutSections/ExperienceSection.jsx`
- Extract existing Experience section from About.jsx (accordion items)
- Keep all existing Framer Motion animations
- No changes to functionality

### Step 5: Create `src/components/AboutSections/AboutFooter.jsx`
- Left orange brand card + right navigation card
- Large "Sosthene" watermark
- ScrollTrigger at "top 85%", duration-based (no scrub)

### Step 6: Rewrite `About.jsx` as orchestrator
- Import and compose all section components
- Register GSAP ScrollTrigger
- ScrollTrigger.refresh() on window load
- Cleanup on unmount

### Step 7: Update `App.jsx`
- Hide global Footer on `/about` route

## Key Technical Decisions
- Use `sticky top-0` CSS instead of GSAP `pin: true` to avoid pin-spacer DOM injection
- Outer section provides scroll height, inner div sticks
- `anticipatePin: 1` on all ScrollTriggers
- `invalidateOnRefresh: true` on all ScrollTriggers
- Mobile (<768px): reduce card fan rotations by 50% via matchMedia
- Use "Neue Montreal" fallback to Inter (commercial font)
