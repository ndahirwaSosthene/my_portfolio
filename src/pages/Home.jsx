import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { getFeaturedProjects } from '../data/projects'
import { ScrambleLink } from '../components/ui/ScrambleLink'
import { ScrambleTransition } from '../components/ui/ScrambleTransition'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  })
}

// Grid lines component for hover overlay
const GridLines = () => (
  <div className="absolute inset-0 flex justify-center px-6 pointer-events-none z-0">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="flex-1 h-full border-l border-r border-[#161616]"
        style={{ margin: '0 9px' }}
      />
    ))}
  </div>
)

// Project card for home page with hover effects
const HomeProjectCard = ({ project, index, number, isHovered, isAnyHovered, onHover, onLeave }) => {
  const isThisHovered = isHovered === index
  const shouldBlur = isAnyHovered && !isThisHovered

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      className="flex flex-col gap-1.5"
      style={{ width: '280px' }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <Link to={`/projects?highlight=${project.slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded h-44"
          animate={{
            filter: shouldBlur ? 'blur(4px)' : 'blur(0px)',
            scale: isThisHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Project Image */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-dark-100">
              <span className="text-5xl font-display font-bold text-white/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </motion.div>
      </Link>
      
      {/* Number Badge and View Project - Below card */}
      <motion.div 
        className="flex justify-between items-center px-0.5"
        animate={{
          filter: shouldBlur ? 'blur(4px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center">
          <span 
            className={`text-xs font-mono uppercase tracking-tight transition-colors duration-300 ${
              isThisHovered ? 'text-[#9EFF00]' : 'text-light-200/50'
            }`}
          >
            |
          </span>
          <span 
            className={`text-xs font-mono uppercase tracking-tight transition-colors duration-300 ${
              isThisHovered ? 'text-white' : 'text-light-200/50'
            }`}
          >
            {number}
          </span>
          <span 
            className={`text-xs font-mono uppercase tracking-tight transition-colors duration-300 ${
              isThisHovered ? 'text-[#9EFF00]' : 'text-light-200/50'
            }`}
          >
            |
          </span>
        </div>
        
        {/* View Project link - only visible on hover */}
        <AnimatePresence>
          {isThisHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              <span className="text-xs font-mono uppercase tracking-tight text-white">
                View Project
              </span>
              <HiArrowRight className="w-3 h-3 text-light-100" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  )
}

// Default content when no project is hovered
const DEFAULT_TITLE = 'Digital'
const DEFAULT_SUBTITLE = 'Architect'
const DEFAULT_DESCRIPTION = 'Crafting exceptional digital experiences through innovative design and cutting-edge mobile solutions. Turning ideas into pixel-perfect reality with attention to every detail.'
const DEFAULT_SECTION_TITLE = 'Mobile App Development'
const DEFAULT_SECTION_LINK = 'See all projects'

const Home = ({ onContactClick }) => {
  const featuredProjects = getFeaturedProjects().slice(0, 3)
  const [hoveredProject, setHoveredProject] = useState(null)

  const handleProjectHover = (index) => {
    setHoveredProject(index)
  }

  const handleProjectLeave = () => {
    setHoveredProject(null)
  }

  const isAnyHovered = hoveredProject !== null
  const hoveredProjectData = hoveredProject !== null ? featuredProjects[hoveredProject] : null

  // Compute displayed text based on hover state
  const displayTitle = hoveredProjectData 
    ? hoveredProjectData.title.split(' ')[0] 
    : DEFAULT_TITLE
  const displaySubtitle = hoveredProjectData 
    ? (hoveredProjectData.title.split(' ').slice(1).join(' ') || '') 
    : DEFAULT_SUBTITLE
  const displayDescription = hoveredProjectData 
    ? hoveredProjectData.description 
    : DEFAULT_DESCRIPTION
  const displaySectionTitle = hoveredProjectData 
    ? (hoveredProjectData.tags?.[0] || hoveredProjectData.services?.[0] || '') 
    : DEFAULT_SECTION_TITLE
  const displaySectionLink = hoveredProjectData 
    ? `${hoveredProjectData.year}` 
    : DEFAULT_SECTION_LINK

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 bg-dark flex flex-col relative"
    >
      {/* Grid lines background - visible on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isAnyHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <GridLines />
      </motion.div>

      {/* Main Content Area - positioned to match Figma */}
      <main className="flex-1 pt-[168px] px-10 lg:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto h-full flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Hero Content */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              {/* Main Headline - Scrambles on hover */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="mb-7"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-normal text-light-100 leading-[0.95]">
                  <ScrambleTransition 
                    text={displayTitle}
                    duration={0.5}
                    speed={0.025}
                    className="block"
                  />
                  <ScrambleTransition 
                    text={displaySubtitle}
                    duration={0.5}
                    speed={0.025}
                    className="block"
                  />
                </h1>
              </motion.div>

              {/* Body Copy - Scrambles on hover */}
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-stone-300 text-xl lg:text-2xl font-light leading-relaxed max-w-[500px] mb-7"
              >
                <ScrambleTransition 
                  text={displayDescription}
                  duration={0.6}
                  speed={0.02}
                  as="p"
                />
              </motion.div>

              {/* CTA Links - Hide on hover */}
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                <motion.div
                  className="flex items-center gap-6"
                  animate={{ 
                    opacity: isAnyHovered ? 0 : 1,
                    y: isAnyHovered ? 10 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to="/about" 
                    className="text-light-100 font-medium text-xl hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ScrambleLink>More about me</ScrambleLink>
                    <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <button
                    onClick={onContactClick}
                    className="text-light-100 font-medium text-xl hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ScrambleLink>Let's talk</ScrambleLink>
                    <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Project Gallery */}
            <div className="lg:col-span-7 flex flex-col items-end gap-8 mt-[43px]">
              {/* Section Header - Scrambles on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-end"
              >
                <h2 className="text-light-100 font-display font-medium text-2xl lg:text-3xl mb-2">
                  <ScrambleTransition 
                    text={displaySectionTitle}
                    duration={0.5}
                    speed={0.025}
                  />
                </h2>
                <div className="flex items-center gap-2">
                  {/* Show tags on hover, otherwise show "See all projects" link */}
                  {isAnyHovered ? (
                    <div className="flex items-center gap-3 text-light-200/60 text-xl font-medium">
                      {hoveredProjectData?.tags?.slice(0, 2).map((tag, i) => (
                        <ScrambleTransition 
                          key={i}
                          text={tag}
                          duration={0.4}
                          speed={0.025}
                          className="text-light-200/60"
                        />
                      ))}
                      <ScrambleTransition 
                        text={displaySectionLink}
                        duration={0.4}
                        speed={0.025}
                        className="text-light-200/60"
                      />
                    </div>
                  ) : (
                    <Link 
                      to="/projects" 
                      className="text-light-200/60 hover:text-primary transition-colors text-xl font-medium flex items-center gap-1"
                    >
                      <ScrambleLink>See all projects</ScrambleLink>
                      <span className="text-xs">↗</span>
                    </Link>
                  )}
                </div>
              </motion.div>

              {/* Projects Row - Inline flex */}
              <div className="inline-flex justify-start items-start gap-2">
                {featuredProjects.map((project, index) => (
                  <HomeProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    number={String(index + 1).padStart(2, '0')}
                    isHovered={hoveredProject}
                    isAnyHovered={isAnyHovered}
                    onHover={handleProjectHover}
                    onLeave={handleProjectLeave}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  )
}

export default Home
