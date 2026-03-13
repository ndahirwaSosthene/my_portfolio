import { motion } from 'framer-motion'
import { useState } from 'react'
import experience from '../../data/experience'

const ExperienceItem = ({ exp, isOpen, onToggle }) => (
  <div
    className="w-full flex flex-col gap-6 cursor-pointer"
    onClick={onToggle}
  >
    {/* Header Row */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div className="flex items-center gap-9">
        <div
          className={`${isOpen ? 'w-5 h-5' : 'w-3 h-3'} bg-zinc-300 rounded-full flex-shrink-0 transition-all duration-300`}
        />
        <h3 className="text-white text-4xl lg:text-6xl font-normal font-serif italic">
          {exp.position}
        </h3>
      </div>
      <div className="flex flex-col lg:items-start ml-12 lg:ml-0">
        <span className="text-white text-2xl lg:text-3xl font-normal font-display">
          {exp.company}
        </span>
        <span className="text-white text-base font-normal">{exp.location}</span>
      </div>
    </div>

    {/* Expanded Content - Accordion */}
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="flex flex-col items-end gap-10 pb-4">
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-28">
          <div className="w-full lg:w-96 flex flex-col gap-5">
            <h4 className="text-white text-2xl font-medium font-display">
              Assignment
            </h4>
            <p className="text-white text-lg font-normal font-display">
              {exp.assignment}
            </p>
          </div>
          <div className="w-full lg:w-80 flex flex-col gap-5">
            <h4 className="text-white text-xl font-medium font-display">
              Solution
            </h4>
            <p className="text-white text-lg font-normal font-display">
              {exp.solution}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-6">
          {exp.tags?.map((tag, index) => (
            <div key={index} className="flex items-center gap-6">
              <span className="text-white text-base font-medium">{tag}</span>
              {index < exp.tags.length - 1 && (
                <div className="w-1 h-1 bg-zinc-300 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    <div className="w-full h-px bg-white" />
  </div>
)

const ExperienceSection = () => {
  const [openExperienceId, setOpenExperienceId] = useState(null)

  const toggleExperience = (id) => {
    setOpenExperienceId(openExperienceId === id ? null : id)
  }

  return (
    <section className="min-h-[899px] relative bg-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col lg:flex-row pt-40 px-10 gap-20">
        {/* Left - Title Column */}
        <div className="w-full lg:w-96 flex flex-col gap-6 flex-shrink-0">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl lg:text-8xl font-medium font-display text-stone-100 leading-tight tracking-tight"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl font-normal font-display text-white"
          >
            Building exceptional digital experiences across various industries
            and platforms.
          </motion.p>
        </div>

        {/* Right - Experience List */}
        <div className="flex-1 flex flex-col gap-5 pb-20">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ExperienceItem
                exp={exp}
                isOpen={openExperienceId === exp.id}
                onToggle={() => toggleExperience(exp.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
