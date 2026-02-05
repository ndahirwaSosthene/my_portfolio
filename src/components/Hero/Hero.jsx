import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HiArrowDown } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Hero = ({ onContactClick }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Background Elements with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,107,53,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="section-container relative z-10 text-center"
      >
        {/* Pre-title */}
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4"
        >
          UI/UX Designer & Mobile Developer
        </motion.p>

        {/* Main Name */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-light-100 mb-4"
        >
          NDAHIRWA
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-2xl md:text-3xl lg:text-4xl font-display text-light-200/80 mb-6"
        >
          Digital Architect
        </motion.h2>

        {/* Tagline */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-light-200/60 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Crafting exceptional digital experiences through innovative design and 
          cutting-edge mobile solutions. Turning ideas into pixel-perfect reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/about">
            <motion.span
              className="btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              More about me
            </motion.span>
          </Link>
          
          <motion.button
            onClick={onContactClick}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's talk
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-light-200/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <HiArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
