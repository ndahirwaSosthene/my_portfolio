import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { getFeaturedProjects } from '../data/projects'
import { ScrambleLink } from '../components/ui/ScrambleLink'

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

const HomeProjectCard = ({ project, index, number }) => {
  // Different gradient backgrounds for cards
  const gradientClasses = [
    'bg-gradient-to-br from-dark-50 to-dark-100',
    'bg-gradient-to-br from-pink-400/80 via-pink-300/70 to-orange-200/60',
    'bg-gradient-to-br from-orange-400 to-amber-500',
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      className="w-72 flex flex-col gap-1.5"
    >
      <Link to={`/projects?highlight=${project.slug}`} className="group block">
        <motion.div
          className={`relative overflow-hidden rounded h-44 ${gradientClasses[index]}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Project Image */}
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl font-display font-bold text-white/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </motion.div>
      </Link>
      
      {/* Number Badge - Below card */}
      <div className="flex justify-between items-center px-0.5">
        <span className="text-light-200/50 text-xs font-mono uppercase tracking-tight">[{number}]</span>
      </div>
    </motion.article>
  )
}

const Home = ({ onContactClick }) => {
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-1 bg-dark flex flex-col"
    >
      {/* Main Content Area */}
      <main className="flex-1 pt-20 px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto h-full flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Hero Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Main Headline */}
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-light-100 leading-[0.95] mb-6"
              >
                Digital<br />Architect
              </motion.h1>

              {/* Body Copy */}
              <motion.p
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-light-200/50 text-sm lg:text-base leading-relaxed max-w-md mb-8"
              >
                Crafting exceptional digital experiences through innovative design and 
                cutting-edge mobile solutions. Turning ideas into pixel-perfect reality 
                with attention to every detail.
              </motion.p>

              {/* CTA Links */}
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="flex items-center gap-6"
              >
                <Link 
                  to="/about" 
                  className="text-light-100 font-nav text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <ScrambleLink>More about me</ScrambleLink>
                  <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button
                  onClick={onContactClick}
                  className="text-light-100 font-nav text-sm hover:text-primary transition-colors flex items-center gap-2 group"
                >
                  <ScrambleLink>Let's talk</ScrambleLink>
                  <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Right Column - Project Gallery */}
            <div className="lg:col-span-7 flex flex-col items-end gap-6">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-end"
              >
                <h2 className="text-light-100 font-display font-semibold text-lg lg:text-xl mb-1">
                  Mobile App Development
                </h2>
                <Link 
                  to="/projects" 
                  className="text-light-200/60 hover:text-primary transition-colors text-sm font-nav flex items-center gap-1"
                >
                  <ScrambleLink>See all projects</ScrambleLink>
                  <span className="text-xs">↗</span>
                </Link>
              </motion.div>

              {/* Projects Row - Inline flex */}
              <div className="inline-flex justify-start items-start gap-2">
                {featuredProjects.map((project, index) => (
                  <HomeProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index}
                    number={String(index + 1).padStart(2, '0')}
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
