import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects?highlight=${project.slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-dark-50 aspect-[4/3]"
          whileHover={{ 
            scale: 1.02,
            rotateX: 2,
            rotateY: -2
          }}
          transition={{ duration: 0.3 }}
          style={{ transformPerspective: 1000 }}
        >
          {/* Project Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-50 to-dark-100">
              <span className="text-6xl font-display font-bold text-primary/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-light-100 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <motion.div
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiArrowRight className="text-white text-xl transform group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  )
}

export default ProjectCard
