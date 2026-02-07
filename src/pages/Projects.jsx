import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiExternalLink } from 'react-icons/hi'
import projects from '../data/projects'
import { ScrambleLink } from '../components/ui/ScrambleLink'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const ProjectCard = ({ project, index }) => {
  const handleExternalClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(project.liveSiteUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="w-96 p-2 bg-dark-50 rounded-lg border border-dark-100 inline-flex flex-col justify-start items-start"
    >
      {/* Browser Chrome */}
      <div className="w-full pb-2 inline-flex justify-between items-center">
        {/* Window Controls - Three dots */}
        <div className="w-12 flex justify-start items-center gap-2">
          <div className="w-2 h-2 bg-dark-100 rounded-full" />
          <div className="w-2 h-2 bg-dark-100 rounded-full" />
          <div className="w-2 h-2 bg-dark-100 rounded-full" />
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 h-8 px-4 py-2 mx-2 bg-dark rounded border border-dark-100 flex justify-center items-center">
          <span className="text-center text-light-200/70 text-sm font-normal truncate max-w-[200px]">
            {project.liveSite || `${project.slug}.com`}/
          </span>
        </div>
        
        {/* External Link Icon */}
        <button 
          onClick={handleExternalClick}
          className="w-12 flex justify-end items-center group"
          title="Open live site"
        >
          <div className="w-6 h-6 border border-dark-100 rounded flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-colors">
            <HiExternalLink className="w-3.5 h-3.5 text-light-200/50 group-hover:text-primary transition-colors" />
          </div>
        </button>
      </div>
      
      {/* Project Image - Clickable to project detail */}
      <Link to={`/project/${project.slug}`} className="w-full block group">
        <div className="w-full rounded border border-white/5 overflow-hidden">
          <div className={`w-full aspect-square ${project.color} flex items-center justify-center relative`}>
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <span className="text-white/20 text-8xl font-display font-bold group-hover:scale-110 transition-transform duration-300">
                {project.title.charAt(0)}
              </span>
            )}
            
            {/* Hover overlay with title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-medium">{project.title}</h3>
              <p className="text-white/60 text-sm mt-1">{project.tags?.slice(0, 2).join(' • ')}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const Projects = ({ onContactClick }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-dark"
    >
      {/* Main Content */}
      <section className="pt-32 pb-24 px-10 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl lg:text-8xl font-display font-medium text-stone-100 capitalize mb-16"
          >
            Projects
          </motion.h1>

          {/* Projects Grid */}
          <div className="flex flex-wrap gap-8 justify-start">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}  
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-10 lg:px-20 bg-dark overflow-hidden">
        {/* Decorative rotated cards */}
        <div className="absolute left-0 top-0 bottom-0 w-48">
          <div className="w-44 h-36 absolute -left-16 -top-8 origin-top-left rotate-[50deg] bg-zinc-400 rounded-lg" />
          <div className="w-44 h-36 absolute -left-16 top-28 origin-top-left rotate-[7deg] bg-zinc-300 rounded-lg" />
          <div className="w-44 h-36 absolute -left-20 top-60 origin-top-left -rotate-[8deg] bg-zinc-500 rounded-lg" />
        </div>

        <div className="max-w-[500px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-stone-100 text-base font-mono uppercase leading-4 tracking-wide mb-12"
          >
            Ready to bring your ideas to life? Let's create something amazing together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-14"
          >
            <button 
              onClick={onContactClick}
              className="text-stone-100 text-xs font-mono uppercase tracking-wide hover:text-primary transition-colors"
            >
              <ScrambleLink>Contacts</ScrambleLink>
            </button>
            <span className="text-stone-100 text-xs font-mono uppercase">or</span>
            <button 
              onClick={onContactClick}
              className="text-stone-100 text-xs font-mono uppercase tracking-wide hover:text-primary transition-colors"
            >
              <ScrambleLink>Fill out form</ScrambleLink>
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Projects
