import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'

const SkillCard = ({ skill, index = 0 }) => {
  const navigate = useNavigate()

  const handleProofClick = () => {
    navigate(`/projects?filter=${skill.filterTag}`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className={`${skill.gradient} rounded-2xl p-6 md:p-8 relative overflow-hidden group`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

      <div className="relative z-10">
        {/* Skill Name */}
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-white/80 mb-6 leading-relaxed">
          {skill.description}
        </p>

        {/* Tools */}
        <div className="mb-6">
          <span className="text-white/60 text-sm uppercase tracking-wider mb-2 block">Tools</span>
          <div className="flex flex-wrap gap-2">
            {skill.tools.map((tool) => (
              <span
                key={tool}
                className="text-sm px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-6">
          <div>
            <span className="block text-2xl font-bold text-white">{skill.experience}</span>
            <span className="text-white/60 text-sm">Experience</span>
          </div>
          <div>
            <span className="block text-2xl font-bold text-white">{skill.projectCount}+</span>
            <span className="text-white/60 text-sm">Projects</span>
          </div>
        </div>

        {/* Proof Button */}
        <motion.button
          onClick={handleProofClick}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-medium transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proof
          <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default SkillCard
