import { motion } from 'framer-motion'
import Hero from '../components/Hero/Hero'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import CTA from '../components/CTA/CTA'
import TestimonialCarousel from '../components/TestimonialCarousel/TestimonialCarousel'
import { getFeaturedProjects } from '../data/projects'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const Home = ({ onContactClick }) => {
  const featuredProjects = getFeaturedProjects()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <Hero onContactClick={onContactClick} />

      {/* Featured Projects Section */}
      <section className="section-padding bg-dark">
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-primary uppercase tracking-widest text-sm mb-2">
                Selected Work
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-light-100">
                Featured Projects
              </h2>
            </div>
            <motion.a
              href="/projects"
              className="text-light-200/70 hover:text-primary transition-colors flex items-center gap-2 group"
              whileHover={{ x: 5 }}
            >
              View all projects
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-dark-100">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-widest text-sm mb-2">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-light-100">
              What Clients Say
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA onContactClick={onContactClick} />
    </motion.div>
  )
}

export default Home
