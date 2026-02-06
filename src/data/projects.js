export const projects = [
  {
    id: 1,
    title: "Loyal Consultancy LTD",
    slug: "loyal-consultancy",
    thumbnail: "/assets/projects/loyal-consultancy.jpg",
    tags: ["UI/UX Design", "Branding", "Web Design"],
    featured: true,
    description: "Complete brand identity and web design for a leading consultancy firm, focusing on modern aesthetics and user experience.",
    fullDescription: "Giving a leading consultancy firm a brand new physical & digital identity.",
    year: "2024",
    color: "bg-sky-900",
    services: ["Branding", "Design", "Development"],
    liveSite: "loyalconsultancy.com",
    liveSiteUrl: "https://loyalconsultancy.com",
    carbonFootprint: { value: "0.28", grade: "A", percentage: "72" },
    images: []
  },
  {
    id: 2,
    title: "TRAVELLERS APP",
    slug: "travellers-app",
    thumbnail: "/assets/projects/travellers-app.jpg",
    tags: ["Mobile App", "UI/UX Design", "No-Code"],
    featured: true,
    description: "A comprehensive travel companion app designed to simplify trip planning and enhance travel experiences.",
    fullDescription: "Creating a seamless travel companion app that simplifies trip planning and enhances experiences.",
    year: "2024",
    color: "bg-orange-400",
    services: ["UI/UX Design", "Mobile App", "Prototyping"],
    liveSite: "travellers.app",
    liveSiteUrl: "https://travellers.app",
    carbonFootprint: { value: "0.35", grade: "B", percentage: "60" },
    images: []
  },
  {
    id: 3,
    title: "Career Ticket",
    slug: "career-ticket",
    thumbnail: "/assets/projects/career-ticket.jpg",
    tags: ["UI/UX Design", "Web Design", "Figma"],
    featured: true,
    description: "Job search platform with intuitive interface designed to connect job seekers with opportunities seamlessly.",
    fullDescription: "Building an intuitive job search platform that connects seekers with opportunities.",
    year: "2023",
    color: "bg-blue-600",
    services: ["Design", "Figma", "Prototyping"],
    liveSite: "careerticket.io",
    liveSiteUrl: "https://careerticket.io",
    carbonFootprint: { value: "0.41", grade: "B", percentage: "55" },
    images: []
  },
  {
    id: 4,
    title: "BISCUIT AGENCY",
    slug: "biscuit-agency",
    thumbnail: "/assets/projects/biscuit-agency.jpg",
    tags: ["Branding", "UI/UX Design", "Web Design"],
    featured: false,
    description: "Creative agency branding and website design with bold visuals and engaging user interactions.",
    fullDescription: "Bold branding and website design for a creative agency pushing boundaries.",
    year: "2023",
    color: "bg-black",
    services: ["Branding", "Design", "Development"],
    liveSite: "biscuit.agency",
    liveSiteUrl: "https://biscuit.agency",
    carbonFootprint: { value: "0.30", grade: "A", percentage: "70" },
    images: []
  },
  {
    id: 5,
    title: "OCKHAM PICTURES",
    slug: "ockham-pictures",
    thumbnail: "/assets/projects/ockham-pictures.jpg",
    tags: ["UI/UX Design", "Branding", "Figma"],
    featured: false,
    description: "Film production company visual identity and portfolio website showcasing cinematographic excellence.",
    fullDescription: "Visual identity and portfolio website for a film production company.",
    year: "2023",
    color: "bg-black/60",
    services: ["Branding", "Design"],
    liveSite: "ockhampictures.com",
    liveSiteUrl: "https://ockhampictures.com",
    carbonFootprint: { value: "0.38", grade: "B", percentage: "58" },
    images: []
  },
  {
    id: 6,
    title: "Gain Project",
    slug: "gain-project",
    thumbnail: "/assets/projects/gain-project.jpg",
    tags: ["Mobile App", "UI/UX Design", "Figma"],
    featured: false,
    description: "Fitness and wellness application designed to help users track their health journey.",
    fullDescription: "Giving an online health & longevity platform a brand new physical & digital identity.",
    year: "2024",
    color: "bg-emerald-600",
    services: ["Branding", "Design", "Development"],
    liveSite: "gain.health",
    liveSiteUrl: "https://gain.health",
    carbonFootprint: { value: "0.32", grade: "B", percentage: "65" },
    images: []
  }
]

export const getProjectBySlug = (slug) => projects.find(p => p.slug === slug)

export const getNextProject = (currentId) => {
  const currentIndex = projects.findIndex(p => p.id === currentId)
  const nextIndex = (currentIndex + 1) % projects.length
  return projects[nextIndex]
}

export const getFeaturedProjects = () => projects.filter(p => p.featured)

export const getProjectsByTag = (tag) => {
  if (!tag) return projects
  return projects.filter(p => 
    p.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')).includes(tag.toLowerCase())
  )
}

export const getAllTags = () => {
  const tags = new Set()
  projects.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
}

export default projects
