export const projects = [
  {
    id: 1,
    title: "Loyal Consultancy LTD",
    slug: "loyal-consultancy",
    thumbnail: "/assets/projects/loyal-consultancy.jpg",
    tags: ["UI/UX Design", "Branding", "Web Design"],
    featured: true,
    description: "Complete brand identity and web design for a leading consultancy firm, focusing on modern aesthetics and user experience.",
    year: "2024"
  },
  {
    id: 2,
    title: "TRAVELLERS APP",
    slug: "travellers-app",
    thumbnail: "/assets/projects/travellers-app.jpg",
    tags: ["Mobile App", "UI/UX Design", "No-Code"],
    featured: true,
    description: "A comprehensive travel companion app designed to simplify trip planning and enhance travel experiences.",
    year: "2024"
  },
  {
    id: 3,
    title: "Career Ticket",
    slug: "career-ticket",
    thumbnail: "/assets/projects/career-ticket.jpg",
    tags: ["UI/UX Design", "Web Design", "Figma"],
    featured: true,
    description: "Job search platform with intuitive interface designed to connect job seekers with opportunities seamlessly.",
    year: "2023"
  },
  {
    id: 4,
    title: "BISCUIT AGENCY",
    slug: "biscuit-agency",
    thumbnail: "/assets/projects/biscuit-agency.jpg",
    tags: ["Branding", "UI/UX Design", "Web Design"],
    featured: false,
    description: "Creative agency branding and website design with bold visuals and engaging user interactions.",
    year: "2023"
  },
  {
    id: 5,
    title: "OCKHAM PICTURES",
    slug: "ockham-pictures",
    thumbnail: "/assets/projects/ockham-pictures.jpg",
    tags: ["UI/UX Design", "Branding", "Figma"],
    featured: false,
    description: "Film production company visual identity and portfolio website showcasing cinematographic excellence.",
    year: "2023"
  },
  {
    id: 6,
    title: "Gain Project",
    slug: "gain-project",
    thumbnail: "/assets/projects/gain-project.jpg",
    tags: ["Mobile App", "UI/UX Design", "Figma"],
    featured: false,
    description: "Fitness and wellness application designed to help users track their health journey.",
    year: "2024"
  }
]

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
