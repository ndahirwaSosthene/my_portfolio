# Portfolio Website Development Prompt for NDAHIRWA

## CONTEXT
You are developing a modern, creative portfolio website for INEZA Ndahirwa Sosthene, a UI/UX designer and mobile app developer. The goal is to attract clients and employment opportunities across UI/UX design, mobile app development, and no-code development.

---

## TECHNICAL STACK
- **Framework**: React
- **Animation Library**: Framer Motion
- **Styling**: CSS Modules or Tailwind CSS (choose based on design complexity)
- **Routing**: React Router
- **Build Tool**: Vite or Create React App
- **No CMS required**

---

## DESIGN FILES & ASSETS
Reference the following design files for visual guidance:
All in designs folder
- `1536w_default.png` - Project showcase/branding reference (Gain project)
- `home-page.png` - Homepage layout and hero section
- `about-me_bio.png` - Biography section design
- `about-me_experience.png` - Experience timeline/layout
- `about-me_skills.png` & `about-me_skills1.png` - Skills cards with gradient backgrounds
- `about-me_work.png` - How I work process section
- `clients___testimonials.png` - Testimonial cards carousel
- `CTA.png` - Call-to-action section design
- `Desktop_-_6.png` - Projects page layout

**Design Style Notes**:
- Black and light backgrounds (no theme toggle needed)
- Orange accent color (#FF6B35 or similar coral/orange)
- Clean, modern typography (likely sans-serif)
- Gradient overlays on cards (orange-to-pink, orange-to-yellow)
- High contrast for readability
- Generous white space

---

## SITE STRUCTURE

### **3 Main Pages**

#### 1. **Homepage** (`/`)
Sections in order:
1. Hero Section (PRIORITY)
   - Full viewport height
   - Name: "NDAHIRWA" prominent
   - Subtitle: "Digital Architect"
   - Brief tagline
   - CTA buttons: "More about me" | "Let's talk"
   
2. Projects Showcase (3 Featured Projects)
   - Grid layout (3 columns on desktop)
   - Each card shows: Project thumbnail, title, arrow icon
   - Hover effect: 3D lift/tilt + scale
   
3. CTA Section
   - Contact encouragement
   - "CONTACTS" and "FILL OUT FORM" options
   
4. Footer
   - Copyright, social links, navigation

#### 2. **About Me** (`/about`)
Sections in order:
1. Biography (PRIORITY)
   - Photo of INEZA (left)
   - Name and intro text (right)
   - Contact info: Email, Instagram, LinkedIn, Phone, Resume Download
   
2. Skill Set (PRIORITY)
   - "I CAN DO WONDERS" heading
   - Skill cards with gradient backgrounds
   - Each card: Skill name, tools used, experience years, project count
   - **"Proof" button on each card** → links to Projects page with filtered results by skill tag
   
3. Experience
   - "Experience" heading on left
   - Timeline/list on right
   - Each entry: Job title (italic), company, location, assignment details, solution, tags (full-time, figma, team management, duration, industry)
   
4. How I Work
   - Process breakdown with numbered steps
   - Illustration + text for each step
   - Example: "01 Understanding client goals" with description
   
5. Contacts & Resume
   - Duplicate contact section or integrate into footer
   
6. Footer

#### 3. **Projects** (`/projects`)
Sections in order:
1. Projects Grid (PRIORITY)
   - **Filtering system by tags/skills** (essential)
   - Grid layout (2-3 columns)
   - Each card: Project name, thumbnail/logo, arrow icon
   - Projects shown:
     - Loyal Consultancy LTD
     - TRAVELLERS APP
     - Career Ticket
     - BISCUIT AGENCY
     - OCKHAM PICTURES
   
2. CTA Section
   
3. Footer

---

## NAVIGATION

### **Desktop Navigation**
- Sticky header (remains visible on scroll)
- Logo/Name on left: "NDAHIRWA" (orange background or accent)
- Center: "Get in touch" link/button
- Right: "Home" | "About Me" | "Projects"
- Active page indicated with orange underline

### **Mobile Navigation**
- **Full-page hamburger menu**
- Hamburger icon (top right)
- When opened:
  - Full viewport overlay (black background)
  - Very large typography for menu items
  - Smooth fade-in animation
  - Close icon (X) in corner

---

## ANIMATIONS & INTERACTIONS

### **General Principles**
- Use Framer Motion for all animations
- Performance: Keep animations smooth (60fps)
- Respect `prefers-reduced-motion` for accessibility

### **Scroll Animations**
- **Smooth scrolling** between sections (use `scroll-behavior: smooth` or Framer Motion scroll)
- **Parallax effects**:
  - Hero section: Background elements move slower than foreground
  - Project cards: Subtle depth on scroll
  - Skill cards: Stagger animation on scroll into view
  
- **Morphing elements**:
  - Hero tagline: Text morphs/reveals on load
  - Section transitions: Shape morphs between sections
  
- **Fade-in on scroll**: Biography text, experience entries, testimonials

### **Hover Effects**
- **Project cards**: 3D transform (rotate X/Y slightly), scale up 1.05, shadow increase
- **Skill cards**: Gradient shift, slight lift
- **Buttons**: Scale, color shift, arrow icon slide
- **Navigation links**: Underline expand animation

### **Page Transitions**
- Simple ease-in/out fade
- Duration: 300-500ms
- Use Framer Motion `AnimatePresence` for route transitions

### **Auto-scrolling Elements**
- **Testimonials carousel**: Auto-advance every 5 seconds, smooth transition, pause on hover
- Navigation arrows for manual control

### **Interactive Elements**
- **Modal/Popup for Contact Form**:
  - Trigger: CTA buttons or "FILL OUT FORM"
  - Overlay: Semi-transparent black
  - Modal: Centered, white background, form fields
  - Close: X icon or click outside
  - Animation: Scale up from center + fade in

---

## KEY FEATURES TO IMPLEMENT

### **1. Project Filtering System** (CRITICAL)
- Each project has associated tags/skills (e.g., "UI/UX Design", "Figma", "Mobile App")
- Skills cards have "Proof" button
- Clicking "Proof" on a skill:
  - Navigates to `/projects`
  - Automatically filters projects by that skill tag
  - URL parameter: `/projects?filter=ui-ux-design`
  - Visual indication of active filter
- Projects page has filter chips/buttons at top
- Filter animations: Fade out non-matching, slide in matching

### **2. Contact Form Modal**
- Trigger buttons: "Let's talk", "FILL OUT FORM"
- Form fields:
  - Name (required)
  - Email (required, validated)
  - Message (textarea, required)
  - Submit button
- Form handling: Use a service like Formspree, EmailJS, or Web3Forms
- Success state: Thank you message
- Error handling: Show validation errors

### **3. Resume Download**
- Button/link in Biography section
- Download file: "MY_RESUME.PDF" or similar
- Icon: Download arrow

### **4. Lazy Loading**
- Implement for all images (project thumbnails, photos)
- Use native `loading="lazy"` or Intersection Observer

### **5. Testimonials Auto-Scroll**
- Carousel with 3-4 testimonials visible at desktop
- Auto-advance: 5-second interval
- Smooth transition (slide or fade)
- Navigation: Left/Right arrows
- Pause on hover
- Testimonial cards shown:
  - Loyal Consultancy - NDAHIRWA Benjamin, MD
  - Code Style - KABERUKA Gerarg, Chief
  - Ishyiga - KIMENYI A., CEO at Algorithm Inc.

---

## RESPONSIVE DESIGN

### **Breakpoints**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### **Mobile Adaptations**
- Full-page hamburger menu (as specified)
- Single-column layouts
- Larger touch targets (min 44px)
- Project grid: 1 column
- Skills: 1-2 columns
- Experience: Stacked layout
- Reduced animation complexity if needed

### **Tablet**
- 2-column grids
- Adjusted spacing
- Standard navigation or hamburger (decide based on space)

---

## ACCESSIBILITY

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states visible
- Sufficient color contrast (test with tools)
- Alt text for all images
- Skip to main content link
- Respect `prefers-reduced-motion`

---

## PERFORMANCE OPTIMIZATION

- Image optimization (WebP format, compressed)
- Lazy loading for images
- Code splitting by route (React Router lazy loading)
- Minimize bundle size
- Use React.memo for heavy components
- Debounce scroll events

---

## IMPLEMENTATION STEPS

### **Phase 1: Setup & Foundation**
1. Initialize React project with Vite
2. Install dependencies: `react-router-dom`, `framer-motion`
3. Set up project folder structure:
   ```
   src/
   ├── components/
   │   ├── Navigation/
   │   ├── Footer/
   │   ├── Hero/
   │   ├── ProjectCard/
   │   ├── SkillCard/
   │   ├── TestimonialCarousel/
   │   ├── ContactModal/
   │   └── CTA/
   ├── pages/
   │   ├── Home.jsx
   │   ├── About.jsx
   │   └── Projects.jsx
   ├── styles/
   ├── assets/
   ├── utils/
   └── App.jsx
   ```
4. Set up routing with React Router
5. Create global styles (typography, colors, reset)

### **Phase 2: Core Components**
1. **Navigation Component**
   - Sticky header logic
   - Active page detection
   - Mobile hamburger (full-page overlay)
   
2. **Footer Component**
   - Reusable across all pages
   
3. **Project Card Component**
   - Props: title, image, link, tags
   - Hover animations with Framer Motion
   
4. **Skill Card Component**
   - Props: skill name, tools, experience, projects, tags
   - "Proof" button with navigation + filter parameter
   - Gradient background styling
   
5. **Testimonial Carousel**
   - Auto-scroll logic
   - Navigation arrows
   - Responsive layout

6. **Contact Modal**
   - Form validation
   - Framer Motion animations
   - Form submission handling

### **Phase 3: Page Development**

#### **Homepage**
1. Hero Section
   - Full viewport height
   - Framer Motion entrance animations
   - Parallax background effect
   
2. Featured Projects
   - Map through 3 featured projects
   - Grid layout with hover effects
   
3. CTA Section
   - Trigger contact modal
   
4. Footer

#### **About Me Page**
1. Biography Section
   - Two-column layout (photo + text)
   - Contact info with copy-to-clipboard
   - Resume download button
   
2. Skill Set Section
   - Grid of skill cards
   - Scroll-triggered stagger animation
   - "Proof" button functionality
   
3. Experience Section
   - Timeline/list layout
   - Tag chips for each entry
   - Fade-in animation on scroll
   
4. How I Work Section
   - Numbered steps with illustrations
   - Morphing/parallax effects

#### **Projects Page**
1. Filtering System
   - Filter chips/buttons at top
   - URL parameter detection
   - Filter logic to show/hide projects
   - Animation for filtered results
   
2. Projects Grid
   - Map through all projects
   - Responsive columns
   - Click to navigate to project details (future enhancement)
   
3. CTA Section

### **Phase 4: Animations & Polish**
1. Implement all Framer Motion animations
2. Add parallax effects with scroll progress
3. Page transition animations
4. Hover states refinement
5. Smooth scrolling behavior
6. Testimonial auto-scroll

### **Phase 5: Testing & Optimization**
1. Test all interactive elements
2. Validate contact form
3. Test filtering system thoroughly
4. Mobile responsiveness testing
5. Cross-browser testing
6. Accessibility audit
7. Performance optimization (Lighthouse)
8. Fix any bugs

---

## DATA STRUCTURE

### **Projects Data** (projects.js)
```javascript
const projects = [
  {
    id: 1,
    title: "Loyal Consultancy LTD",
    slug: "loyal-consultancy",
    thumbnail: "/assets/projects/lc-thumb.jpg",
    tags: ["UI/UX Design", "Branding", "Web Design"],
    featured: true,
    description: "..."
  },
  {
    id: 2,
    title: "TRAVELLERS APP",
    slug: "travellers-app",
    thumbnail: "/assets/projects/travellers-thumb.jpg",
    tags: ["Mobile App", "UI/UX Design", "No-Code"],
    featured: true,
    description: "..."
  },
  // ... more projects
];
```

### **Skills Data** (skills.js)
```javascript
const skills = [
  {
    id: 1,
    name: "UI/UX Design",
    tools: ["Figma"],
    experience: "3 years",
    projectCount: 15,
    tags: ["UI/UX Design", "Figma"],
    gradient: "linear-gradient(135deg, #FF6B35 0%, #F7B731 100%)"
  },
  // ... more skills
];
```

### **Experience Data** (experience.js)
```javascript
const experience = [
  {
    id: 1,
    position: "UI/UX Designer",
    company: "Algorithm Inc.",
    location: "Kigali, Rwanda",
    assignment: "...",
    solution: "...",
    tags: ["full-time", "figma", "team management", "3 months", "e-commerce"]
  },
  // ... more experiences
];
```

### **Testimonials Data** (testimonials.js)
```javascript
const testimonials = [
  {
    id: 1,
    client: "Loyal Consultancy",
    name: "NDAHIRWA Benjamin",
    position: "MD at Loyal Consultancy Ltd.",
    quote: "Sosthene's design prowess is truly remarkable. His ability to translate abstract concepts into visually stunning representations is nothing short of exceptional",
    avatar: "/assets/testimonials/avatar1.jpg"
  },
  // ... more testimonials
];
```

---

## CONTENT PLACEHOLDERS

Replace placeholder text with actual content:

### **Hero Section**
- **Name**: NDAHIRWA (or INEZA Ndahirwa Sosthene)
- **Title**: Digital Architect
- **Tagline**: [Your actual tagline - e.g., "Figma ipsum component variant main layer. Scale create clip union line asset. Distribute auto edit stroke star undo distribute rotate."]

### **Biography**
- Write compelling introduction about your background, expertise, and passion
- Highlight your unique value proposition

### **Contact Information**
- Email: ndahirwas@gmail.com
- Instagram: @i_ndahirwas_s
- LinkedIn: /in/rylan-phillips
- Phone: +250 791 804 052

### **Experience Entries**
- Fill in actual job details, assignments, and solutions

---

## DELIVERABLES CHECKLIST

- [ ] All 3 pages fully functional
- [ ] Sticky navigation implemented
- [ ] Full-page mobile hamburger menu
- [ ] Project filtering system working
- [ ] Skills "Proof" button navigation
- [ ] Contact modal functional
- [ ] Testimonial auto-scroll
- [ ] Resume download link
- [ ] All animations implemented (parallax, morphing, hover, transitions)
- [ ] Smooth scrolling between sections
- [ ] Lazy loading for images
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility features
- [ ] Cross-browser tested
- [ ] Performance optimized

---

## ADDITIONAL NOTES

- **Color Palette** (extract from design files):
  - Primary Orange: #FF6B35 (approx)
  - Black: #000000
  - White/Off-white: #FFFFFF / #F5F5F5
  - Gray variations for text
  
- **Typography**:
  - Headings: Large, bold, sans-serif (possibly Inter, Poppins, or custom)
  - Body: Clean sans-serif, good readability
  
- **Icons**: Use React Icons or custom SVGs

- **Future Enhancements** (out of scope for MVP):
  - Individual project detail pages
  - Blog section
  - Dark mode toggle
  - CMS integration
  - Analytics

---

## QUESTIONS TO CLARIFY BEFORE STARTING

1. Do you have actual content ready, or should the AI use placeholder content initially?
2. Are the design files the final source of truth, or are there Figma files available?
3. Do you have a preferred form submission service (Formspree, EmailJS, etc.)?
4. Should the resume download be a static PDF file you provide?
5. Are there any specific font families you want to use?
6. Do you have high-resolution images/assets ready, or should the AI use placeholders?

---

**START DEVELOPMENT**: Begin with Phase 1 (Setup & Foundation) and proceed sequentially through each phase. Prioritize the hero section, skills section, projects page, and biography as these are marked as PRIORITY. Ensure the filtering system is robust as it's critical to the user experience.