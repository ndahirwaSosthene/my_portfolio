import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import projects from '../data/projects'
import { ScrambleLink } from '../components/ui/ScrambleLink'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const ProjectCard = ({ project, index }) => {
  return (
    <Link to={`/project/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`w-96 h-80 relative ${project.color} rounded-2xl overflow-hidden group cursor-pointer`}
      >
        {/* Image placeholder - centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-72 h-56 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-white/30 text-6xl font-display font-bold">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
        
        {/* Title row at bottom */}
        <div className="absolute left-7 right-7 bottom-5 flex justify-between items-center">
          <h3 className="text-white text-xl font-medium font-['Poppins']">
            {project.title}
          </h3>
          <div className="w-5 h-5 border-2 border-white rounded-sm flex items-center justify-center group-hover:bg-white transition-colors">
            <HiArrowRight className="text-white group-hover:text-black w-3 h-3 -rotate-45" />
          </div>
        </div>
      </motion.div>
    </Link>
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
