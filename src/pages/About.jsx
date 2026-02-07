import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiOutlineClipboardCopy, HiOutlineExternalLink } from 'react-icons/hi'
import EnvelopeSkills from '../components/EnvelopeSkills/EnvelopeSkills'
import { Timeline } from '../components/ui/Timeline'
import experience from '../data/experience'

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

const workProcess = [
  { step: '01', title: 'Understanding client goals', description: 'I start by deeply understanding your vision, business objectives, and target audience to ensure the design aligns perfectly with your goals.' },
  { step: '02', title: 'Research & Strategy', description: 'Conducting thorough market research and competitive analysis.' },
  { step: '03', title: 'Design & Iterate', description: 'Creating wireframes, prototypes, and high-fidelity designs.' },
  { step: '04', title: 'Deliver & Support', description: 'Delivering polished, production-ready designs with documentation.' },
]

const ContactItem = ({ label, value, href, hasCopy = false }) => {
  const handleCopy = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="py-2 flex flex-col gap-1">
      <div className="inline-flex items-center gap-2.5">
        <span className="text-stone-100 text-xl font-medium font-nav leading-6 tracking-tight">
          {label}
        </span>
        {hasCopy ? (
          <button 
            onClick={handleCopy}
            className="text-white/70 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            <HiOutlineClipboardCopy size={14} />
          </button>
        ) : (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <HiOutlineExternalLink size={14} />
          </a>
        )}
      </div>
      <a 
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-neutral-400 text-xs font-mono uppercase leading-4 tracking-tight hover:text-primary transition-colors"
      >
        {value}
      </a>
    </div>
  )
}

const ExperienceItem = ({ exp, isOpen, onToggle }) => (
  <div className="w-full flex flex-col gap-6 cursor-pointer" onClick={onToggle}>
    {/* Header Row - Always visible */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      {/* Left - Bullet + Position */}
      <div className="flex items-center gap-9">
        <div className={`${isOpen ? 'w-5 h-5' : 'w-3 h-3'} bg-zinc-300 rounded-full flex-shrink-0 transition-all duration-300`} />
        <h3 className="text-white text-4xl lg:text-6xl font-normal font-['Playfair_Display'] italic">
          {exp.position}
        </h3>
      </div>
      {/* Right - Company + Location */}
      <div className="flex flex-col lg:items-start ml-12 lg:ml-0">
        <span className="text-white text-2xl lg:text-3xl font-normal font-display">
          {exp.company}
        </span>
        <span className="text-white text-base font-normal">
          {exp.location}
        </span>
      </div>
    </div>
    
    {/* Expanded Content - Accordion */}
    <motion.div
      initial={false}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="flex flex-col items-end gap-10 pb-4">
        {/* Assignment & Solution */}
        <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-28">
          {/* Assignment */}
          <div className="w-full lg:w-96 flex flex-col gap-5">
            <h4 className="text-white text-2xl font-medium font-display">Assignment</h4>
            <p className="text-white text-lg font-normal font-display">
              {exp.assignment}
            </p>
          </div>
          {/* Solution */}
          <div className="w-full lg:w-80 flex flex-col gap-5">
            <h4 className="text-white text-xl font-medium font-display">Solution</h4>
            <p className="text-white text-lg font-normal font-display">
              {exp.solution}
            </p>
          </div>
        </div>
        
        {/* Tags */}
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

const About = ({ onContactClick }) => {
  const [openExperienceId, setOpenExperienceId] = useState(null)
  
  const toggleExperience = (id) => {
    setOpenExperienceId(openExperienceId === id ? null : id)
  }
  
  const contactInfo = [
    { label: 'Email', value: 'ndahirwas@gmail.com', href: 'mailto:ndahirwas@gmail.com', hasCopy: true },
    { label: 'Instagram', value: '@i_ndahirwas_s', href: 'https://instagram.com/i_ndahirwas_s' },
    { label: 'Download', value: 'my_resume.pdf', href: '/assets/resume/MY_RESUME.pdf' },
    { label: 'LinkedIn', value: '/in/rylan-phillips', href: 'https://linkedin.com/in/rylan-phillips' },
    { label: 'Phone number', value: '+250 791 804 052', href: 'tel:+250791804052', hasCopy: true },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-dark"
    >
      {/* Hero Section - Dark Background */}
      <section className="min-h-screen pt-20 px-10 lg:px-16 bg-dark">
        <div className="max-w-[1400px] mx-auto h-full flex items-center py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            
            {/* Left Side - Photo/Gradient Area */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-[480px] w-full max-w-[550px]"
            >
              <div className="w-full h-full bg-gradient-to-b from-black/0 to-black/60 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-dark-50 to-dark-100 flex items-center justify-center">
                  <span className="text-[200px] font-display font-bold text-primary/20">N</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <div className="flex flex-col justify-center">
              <motion.h1
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-4xl lg:text-5xl font-display font-normal text-white mb-8 leading-tight"
              >
                I'm INEZA Ndahirwa Sosthene
              </motion.h1>

              <motion.p
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="text-stone-300 text-xl lg:text-2xl font-light font-display leading-relaxed mb-12 max-w-[700px]"
              >
                I'm a passionate UI/UX Designer and Mobile App Developer based in Kigali, Rwanda. 
                With over 3 years of experience, I specialize in creating digital experiences 
                that are not only visually stunning but also highly functional and user-centered.
                My approach combines creative vision with analytical thinking.
              </motion.p>

              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="grid grid-cols-3 gap-x-12 gap-y-4"
              >
                <ContactItem {...contactInfo[0]} />
                <ContactItem {...contactInfo[1]} />
                <ContactItem {...contactInfo[2]} />
                <ContactItem {...contactInfo[3]} />
                <ContactItem {...contactInfo[4]} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Envelope Parallax Animation */}
      <EnvelopeSkills />

      {/* Experience Section (Dark) */}
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
              Building exceptional digital experiences across various industries and platforms.
            </motion.p>
          </div>
          
          {/* Right - Experience List */}
          <div className="flex-1 flex flex-col gap-5">
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

      {/* How I Work Section (Dark) - Timeline */}
      <section className="bg-dark overflow-hidden">
        <Timeline 
          title="How I work"
          subtitle="A structured approach to delivering exceptional results."
          data={workProcess.map((item) => ({
            title: item.step + '. ' + item.title,
            content: (
              <p className="text-white/70 text-base md:text-lg font-display leading-relaxed">
                {item.description}
              </p>
            )
          }))}
        />
      </section>

      {/* CTA Section (Dark) */}
      <section className="py-24 px-10 lg:px-16 bg-dark overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-stone-100 text-base font-mono uppercase tracking-wider max-w-lg mx-auto mb-8"
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
              className="text-stone-100 text-sm font-mono uppercase tracking-wider hover:text-primary transition-colors"
            >
              Contacts
            </button>
            <span className="text-stone-100 text-sm font-mono uppercase">or</span>
            <button 
              onClick={onContactClick}
              className="text-stone-100 text-sm font-mono uppercase tracking-wider hover:text-primary transition-colors"
            >
              Fill out form
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default About
