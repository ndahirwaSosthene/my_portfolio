# NDAHIRWA Portfolio Website

A modern, creative portfolio website for INEZA Ndahirwa Sosthene - UI/UX Designer & Mobile App Developer.

![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.1-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-pink)

## ✨ Features

- **Modern Design**: Black and orange color scheme with gradient accents
- **Smooth Animations**: Powered by Framer Motion with parallax effects
- **Responsive**: Mobile-first design with full-page hamburger menu
- **Project Filtering**: Filter projects by skill/tag with URL persistence
- **Auto-scrolling Testimonials**: Carousel with pause-on-hover
- **Contact Modal**: Ready for form service integration
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation/      # Sticky header + mobile menu
│   ├── Footer/          # Site footer
│   ├── Hero/            # Homepage hero section
│   ├── ProjectCard/     # Project display cards
│   ├── SkillCard/       # Skills with "Proof" button
│   ├── TestimonialCarousel/
│   ├── ContactModal/    # Contact form modal
│   └── CTA/             # Call-to-action section
├── pages/
│   ├── Home.jsx         # Homepage
│   ├── About.jsx        # About & experience
│   └── Projects.jsx     # Projects with filtering
├── data/                # Static data files
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   └── testimonials.js
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles & Tailwind
```

## 🎨 Customization

### Adding Your Content

1. **Profile Photo**: Replace placeholder in `About.jsx` with your image
2. **Resume**: Add PDF to `public/assets/resume/MY_RESUME.pdf`
3. **Project Images**: Add images to `public/assets/projects/`
4. **Bio & Experience**: Edit data files in `src/data/`

### Color Palette

Edit `tailwind.config.js` to customize colors:

```js
colors: {
  primary: '#FF6B35',  // Orange accent
  dark: '#000000',     // Background
  light: '#FFFFFF',    // Text
}
```

### Fonts

Currently using:
- **Inter**: Body text
- **Playfair Display**: Headings

Edit fonts in `index.html` and `tailwind.config.js`.

## 🔧 Form Integration

The contact modal is ready for integration. To add form handling:

1. Sign up for [Formspree](https://formspree.io/), [EmailJS](https://emailjs.com/), or [Web3Forms](https://web3forms.com/)
2. Update `ContactModal.jsx` handleSubmit function
3. Add your form endpoint/API key

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

## 🌐 Deployment

Build the project and deploy the `dist` folder:

```bash
npm run build
```

Works with:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## 📄 License

MIT License - Feel free to use for your own portfolio!

---

Designed & Built with ❤️ by INEZA Ndahirwa Sosthene
