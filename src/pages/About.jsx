import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiDownload } from 'react-icons/hi'
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import SkillCard from '../components/SkillCard/SkillCard'
import CTA from '../components/CTA/CTA'
import skills from '../data/skills'
import experience from '../data/experience'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

const workProcess = [
  {
    step: '01',
    title: 'Understanding client goals',
    description: 'I start by deeply understanding your vision, business objectives, and target audience to ensure the design aligns perfectly with your goals.'
  },
  {
    step: '02',
    title: 'Research & Strategy',
    description: 'Conducting thorough market research and competitive analysis to develop a strategy that sets your product apart.'
  },
  {
    step: '03',
    title: 'Design & Iterate',
    description: 'Creating wireframes, prototypes, and high-fidelity designs with continuous iteration based on feedback.'
  },
  {
    step: '04',
    title: 'Deliver & Support',
    description: 'Delivering polished, production-ready designs with comprehensive documentation and ongoing support.'
  }
]

const About = ({ onContactClick }) => {
  const contactInfo = [
    { icon: HiMail, label: 'Email', value: 'ndahirwas@gmail.com', href: 'mailto:ndahirwas@gmail.com' },
    { icon: FaInstagram, label: 'Instagram', value: '@i_ndahirwas_s', href: 'https://instagram.com/i_ndahirwas_s' },
    { icon: FaLinkedinIn, label: 'LinkedIn', value: '/in/rylan-phillips', href: 'https://linkedin.com/in/rylan-phillips' },
    { icon: HiPhone, label: 'Phone', value: '+250 791 804 052', href: 'tel:+250791804052' },
  ]

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-20" // Account for fixed header
    >
      {/* Biography Section */}
      <section className="section-padding bg-dark">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-dark-50 rounded-2xl overflow-hidden">
                {/* Placeholder for photo */}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl font-display font-bold text-primary/30">N</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10" />
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-primary uppercase tracking-widest text-sm mb-2">
                About Me
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-light-100 mb-6">
                INEZA Ndahirwa<br />
                <span className="text-primary">Sosthene</span>
              </h1>
              
              <div className="space-y-4 text-light-200/80 text-lg mb-8">
                <p>
                  I'm a passionate UI/UX Designer and Mobile App Developer based in Kigali, Rwanda. 
                  With over 3 years of experience, I specialize in creating digital experiences 
                  that are not only visually stunning but also highly functional and user-centered.
                </p>
                <p>
                  My approach combines creative vision with analytical thinking, ensuring every 
                  design decision is backed by user research and aligned with business objectives. 
                  I believe great design is invisible – it just works.
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-light-200/70 hover:text-primary transition-colors group"
                  >
                    <div className="w-10 h-10 bg-dark-50 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="text-primary" size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-light-200/50 block">{item.label}</span>
                      <span className="text-light-100">{item.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Resume Download */}
              <motion.a
                href="/assets/resume/MY_RESUME.pdf"
                download
                className="btn-primary inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDownload size={20} />
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-dark-100">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-widest text-sm mb-2">
              My Expertise
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-light-100">
              I CAN DO <span className="gradient-text">WONDERS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-dark">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <p className="text-primary uppercase tracking-widest text-sm mb-2">
                Career Journey
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-light-100 sticky top-28">
                Experience
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="lg:col-span-8 space-y-8">
              {experience.map((exp, index) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-50 rounded-2xl p-6 md:p-8 relative"
                >
                  {/* Period Badge */}
                  <span className="absolute top-6 right-6 text-sm text-primary font-medium">
                    {exp.period}
                  </span>

                  {/* Position */}
                  <h3 className="text-xl md:text-2xl font-display font-bold text-light-100 mb-1 pr-24">
                    <span className="italic">{exp.position}</span>
                  </h3>
                  
                  {/* Company & Location */}
                  <p className="text-light-200/70 mb-4">
                    {exp.company} • {exp.location}
                  </p>

                  {/* Assignment */}
                  <div className="mb-4">
                    <span className="text-primary text-sm uppercase tracking-wider">Assignment</span>
                    <p className="text-light-200/80 mt-1">{exp.assignment}</p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <span className="text-primary text-sm uppercase tracking-wider">Solution</span>
                    <p className="text-light-200/80 mt-1">{exp.solution}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-dark-100 text-light-200/70 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How I Work Section */}
      <section className="section-padding bg-dark-100">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary uppercase tracking-widest text-sm mb-2">
              My Process
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-light-100">
              How I Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-50 rounded-2xl p-8 relative overflow-hidden group"
              >
                {/* Step Number */}
                <span className="absolute top-6 right-6 text-7xl font-display font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </span>

                <div className="relative z-10">
                  <span className="text-primary text-sm font-medium mb-2 block">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-light-100 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-light-200/70">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA onContactClick={onContactClick} />
    </motion.div>
  )
}

export default About
