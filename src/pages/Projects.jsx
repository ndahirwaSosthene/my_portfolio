import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import CTA from '../components/CTA/CTA'
import projects, { getAllTags } from '../data/projects'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const Projects = ({ onContactClick }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('all')
  
  const allTags = useMemo(() => getAllTags(), [])

  // Handle filter from URL parameters (for "Proof" button navigation)
  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) {
      // Convert URL param to tag format
      const matchedTag = allTags.find(
        tag => tag.toLowerCase().replace(/\s+/g, '-') === filterParam.toLowerCase()
      )
      if (matchedTag) {
        setActiveFilter(matchedTag)
      }
    }
  }, [searchParams, allTags])

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(project => 
      project.tags.some(tag => tag === activeFilter)
    )
  }, [activeFilter])

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    if (filter === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ filter: filter.toLowerCase().replace(/\s+/g, '-') })
    }
  }

  // Clear filter
  const clearFilter = () => {
    setActiveFilter('all')
    setSearchParams({})
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20" // Account for fixed header
    >
      {/* Hero Section */}
      <section className="section-padding bg-dark">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-widest text-sm mb-2">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-light-100 mb-6">
              My Projects
            </h1>
            <p className="text-light-200/70 text-lg max-w-2xl mx-auto">
              A collection of my work spanning UI/UX design, mobile app development, 
              and branding. Each project represents a unique challenge and creative solution.
            </p>
          </motion.div>

          {/* Filter Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <motion.button
              onClick={() => handleFilterChange('all')}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-dark-50 text-light-200/70 hover:text-light-100 hover:bg-dark-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeFilter === tag
                    ? 'bg-primary text-white'
                    : 'bg-dark-50 text-light-200/70 hover:text-light-100 hover:bg-dark-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Filter Indicator */}
          <AnimatePresence>
            {activeFilter !== 'all' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-8"
              >
                <span className="text-light-200/50 text-sm">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} tagged with{' '}
                  <span className="text-primary font-medium">"{activeFilter}"</span>
                </span>
                <button
                  onClick={clearFilter}
                  className="ml-3 text-primary hover:text-primary-400 transition-colors text-sm underline"
                >
                  Clear filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-display font-bold text-light-100 mb-2">
                No projects found
              </h3>
              <p className="text-light-200/70 mb-4">
                There are no projects matching the selected filter.
              </p>
              <button
                onClick={clearFilter}
                className="text-primary hover:text-primary-400 transition-colors underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTA onContactClick={onContactClick} />
    </motion.div>
  )
}

export default Projects
