import { useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroBioSection from '../components/AboutSections/HeroBioSection'
import SkillsSection from '../components/AboutSections/SkillsSection'
import ExperienceSection from '../components/AboutSections/ExperienceSection'
import AboutFooter from '../components/AboutSections/AboutFooter'

gsap.registerPlugin(ScrollTrigger)

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const About = ({ onContactClick }) => {
  useEffect(() => {
    // Refresh ScrollTrigger after all DOM content loads
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('load', handleLoad)

    // Also refresh after Framer Motion page enter animation completes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(refreshTimer)
      // Kill all ScrollTriggers created by this page on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroBioSection onContactClick={onContactClick} />
      <SkillsSection onContactClick={onContactClick} />
      <ExperienceSection />
      <AboutFooter onContactClick={onContactClick} />
    </motion.div>
  )
}

export default About
