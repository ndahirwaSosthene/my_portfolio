import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { RandomLetterSwapPingPong } from '../ui/RandomLetterSwap'

const Navigation = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <Link to="/" className="relative group flex-shrink-0">
              <div className="bg-primary px-4 py-2 rounded-sm transition-transform group-hover:scale-105">
                <span className="block font-nav font-bold text-white text-lg tracking-wide">
                  NDAHIRWA
                </span>
              </div>
            </Link>

            {/* Get in touch - Center */}
            <button
              onClick={onContactClick}
              className="hidden md:block font-nav font-medium text-sm"
            >
              <RandomLetterSwapPingPong
                label="Get in touch"
                primaryClassName="text-light-100"
                secondaryClassName="text-primary"
                staggerDuration={0.015}
              />
            </button>

            {/* Desktop Navigation - Right */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group py-2"
                >
                  <RandomLetterSwapPingPong
                    label={link.name}
                    className="font-nav font-medium text-sm"
                    primaryClassName={isActive(link.path) ? 'text-light-100' : 'text-light-100/70'}
                    secondaryClassName="text-primary"
                    staggerDuration={0.015}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-light-100 transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-light-100 p-2 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <HiMenuAlt4 size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-dark"
          >
            <div className="section-container h-full flex flex-col">
              {/* Close Button */}
              <div className="flex justify-end py-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-light-100 p-2 hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <HiX size={32} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-grow flex flex-col justify-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      to={link.path}
                      className="block"
                    >
                      <RandomLetterSwapPingPong
                        label={link.name}
                        className="text-5xl sm:text-6xl font-display font-bold"
                        primaryClassName={isActive(link.path) ? 'text-light-100' : 'text-light-100/70'}
                        secondaryClassName="text-primary"
                        staggerDuration={0.02}
                      />
                      {isActive(link.path) && (
                        <span className="block h-1 bg-light-100 mt-2 w-20" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      onContactClick()
                    }}
                    className="text-3xl sm:text-4xl font-display"
                  >
                    <RandomLetterSwapPingPong
                      label="Get in touch →"
                      primaryClassName="text-primary"
                      secondaryClassName="text-primary-400"
                      staggerDuration={0.02}
                    />
                  </button>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pb-8 flex gap-6"
              >
                <a href="https://instagram.com/i_ndahirwas_s" target="_blank" rel="noopener noreferrer">
                  <RandomLetterSwapPingPong
                    label="Instagram"
                    primaryClassName="text-light-200"
                    secondaryClassName="text-primary"
                    staggerDuration={0.015}
                  />
                </a>
                <a href="https://linkedin.com/in/rylan-phillips" target="_blank" rel="noopener noreferrer">
                  <RandomLetterSwapPingPong
                    label="LinkedIn"
                    primaryClassName="text-light-200"
                    secondaryClassName="text-primary"
                    staggerDuration={0.015}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
