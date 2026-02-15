export const projects = [
  {
    id: 1,
    title: "Loyal Consultancy LTD",
    slug: "loyal-consultancy",
    thumbnail: "/assets/projects/loyal-consultancy.png",
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
    images: [
      "/assets/projects/loyal-consultancy/1.png",
      "/assets/projects/loyal-consultancy/2.png",
      "/assets/projects/loyal-consultancy/3.png",
      "/assets/projects/loyal-consultancy/4.png",
      "/assets/projects/loyal-consultancy/5.png"
    ]
  },
  {
    id: 2,
    title: "Travellers App",
    slug: "travellers",
    thumbnail: "/assets/projects/travellers-app.png",
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
    title: "Logistics",
    slug: "logistics",
    thumbnail: "/assets/projects/logistics.png",
    tags: ["Web Design", "UI/UX Design", "Development"],
    featured: true,
    description: "Website design for an international shipping company, streamlining logistics solutions for diverse customers worldwide.",
    fullDescription: "Building a modern digital presence for an international shipping and logistics company.",
    year: "2024",
    color: "bg-indigo-600",
    services: ["Design", "Development", "Branding"],
    liveSite: null,
    liveSiteUrl: null,
    carbonFootprint: { value: "0.31", grade: "A", percentage: "68" },
    images: [
      "/assets/projects/logistics/1.png",
      "/assets/projects/logistics/2.png",
      "/assets/projects/logistics/3.png",
      "/assets/projects/logistics/4.png",
      "/assets/projects/logistics/5.png",
      "/assets/projects/logistics/6.png",
      "/assets/projects/logistics/7.png",
      "/assets/projects/logistics/8.png"
    ]
  },
  {
    id: 4,
    title: "Tech Guardians",
    slug: "tech-guardians",
    thumbnail: "/assets/projects/tech-guardians.png",
    tags: ["Web Design", "UI/UX Design", "Non-Profit"],
    featured: true,
    description: "Website for an NGO dedicated to elevating digital skills and teaching digital literacy to youth communities.",
    fullDescription: "Empowering the next generation through digital literacy education and skills development.",
    year: "2024",
    color: "bg-emerald-600",
    services: ["Design", "Development", "Branding"],
    liveSite: null,
    liveSiteUrl: null,
    carbonFootprint: { value: "0.25", grade: "A+", percentage: "78" },
    images: [
      "/assets/projects/tech-guardians/1.png",
      "/assets/projects/tech-guardians/2.png",
      "/assets/projects/tech-guardians/3.png",
      "/assets/projects/tech-guardians/4.png",
      "/assets/projects/tech-guardians/5.png"
    ]
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
