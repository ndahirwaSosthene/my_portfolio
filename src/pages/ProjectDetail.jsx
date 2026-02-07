import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'
import { getProjectBySlug, getNextProject } from '../data/projects'
import { ScrambleLink } from '../components/ui/ScrambleLink'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const MetadataRow = ({ label, children, wide = false }) => (
  <div className={`flex justify-start items-start ${wide ? 'gap-9' : 'gap-32'}`}>
    <span className="text-stone-500 text-xs font-mono uppercase leading-3 tracking-tight min-w-[80px]">
      {label}
    </span>
    <div className="flex flex-col">
      {children}
    </div>
  </div>
)

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-white mb-4">Project not found</h1>
          <Link to="/projects" className="text-primary hover:underline">
            <ScrambleLink>Back to projects</ScrambleLink>
          </Link>
        </div>
      </div>
    )
  }

  const nextProject = getNextProject(project.id)

  // Generate placeholder images for the gallery
  const galleryImages = project.images?.length > 0 
    ? project.images 
    : Array(6).fill(null).map((_, i) => ({ id: i, placeholder: true }))

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-dark min-h-screen"
    >
      {/* Grid lines background (decorative) */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="h-full flex justify-center gap-4 px-6">
          {Array(10).fill(null).map((_, i) => (
            <div key={i} className="w-32 h-full border-l border-r border-white/10" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative pt-20 px-6 max-w-[1520px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Sidebar - Project Info */}
          <div className="lg:w-96 lg:sticky lg:top-20 lg:h-fit pt-16 pb-4 flex flex-col justify-between">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-display font-medium text-stone-100 uppercase leading-tight mb-16"
            >
              {project.title.split(' ')[0]}
            </motion.h1>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-8 mb-20"
            >
              {/* Year */}
              <MetadataRow label="Year">
                <span className="text-stone-100 text-xs font-mono uppercase leading-3 tracking-tight">
                  {project.year}
                </span>
              </MetadataRow>

              {/* Services */}
              <MetadataRow label="Services" wide>
                {project.services.map((service, i) => (
                  <span key={i} className="text-stone-100 text-xs font-mono uppercase leading-4 tracking-tight">
                    {service}
                  </span>
                ))}
              </MetadataRow>

              {/* Live Site */}
              <MetadataRow label="Live site">
                <a 
                  href={project.liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-100 text-xs font-mono uppercase leading-3 tracking-tight hover:text-primary transition-colors"
                >
                  <ScrambleLink>{project.liveSite}</ScrambleLink>
                  <HiExternalLink className="w-2 h-2" />
                </a>
              </MetadataRow>

              {/* Carbon Footprint */}
              <MetadataRow label="Carbon Footprint" wide>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-stone-100 text-xs font-mono uppercase leading-3 tracking-tight">
                      {project.carbonFootprint.value}
                    </span>
                    <span className="text-stone-100 text-xs font-mono uppercase leading-3 tracking-tight">
                      g/CO2
                    </span>
                    <span className="text-lime-400 text-xs font-mono uppercase leading-3 tracking-tight ml-1">
                      {project.carbonFootprint.grade}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-stone-500 text-[10px] font-mono uppercase leading-3 tracking-tight">
                      Cleaner than <span className="text-lime-400">{project.carbonFootprint.percentage}%</span> of web pages.
                    </span>
                    <span className="text-stone-500 text-[10px] font-mono uppercase leading-3 tracking-tight">
                      Source: Websitecarbon.com
                    </span>
                  </div>
                </div>
              </MetadataRow>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-stone-100 text-2xl font-display font-medium leading-8 max-w-96"
            >
              {project.fullDescription}
            </motion.p>
          </div>

          {/* Right Side - Images Gallery */}
          <div className="flex-1 pt-16 pb-16">
            <div className="flex flex-col gap-24">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1 }}
                  className="w-full rounded overflow-hidden"
                >
                  {img.placeholder ? (
                    <div className={`w-full h-[500px] lg:h-[700px] ${project.color} flex items-center justify-center`}>
                      <span className="text-white/20 text-8xl font-display font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <img 
                      src={img.url} 
                      alt={img.alt || `${project.title} - Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Next Project Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24"
            >
              {/* Next Project Label */}
              <div className="flex justify-center items-center gap-2 mb-8">
                <div className="w-2 h-2.5 bg-lime-400" />
                <span className="text-stone-100 text-xs font-mono uppercase leading-3 tracking-tight">
                  Next project
                </span>
                <div className="w-2 h-2.5 bg-lime-400" />
              </div>

              {/* Next Project Preview */}
              <Link 
                to={`/project/${nextProject.slug}`}
                className="block relative rounded overflow-hidden group"
              >
                <div className={`w-full h-[400px] lg:h-[600px] ${nextProject.color} flex items-center justify-center`}>
                  <span className="text-white/20 text-9xl font-display font-bold group-hover:scale-110 transition-transform duration-500">
                    {nextProject.title.charAt(0)}
                  </span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                {/* Title overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-4xl lg:text-6xl font-display font-medium text-white uppercase">
                    {nextProject.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetail
