import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

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
        <nav className="section-container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative group">
              <div className="bg-primary px-4 py-2 transform -skew-x-6 transition-transform group-hover:skew-x-0">
                <span className="block skew-x-6 group-hover:skew-x-0 transition-transform font-bold text-white text-xl">
                  NDAHIRWA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={onContactClick}
                className="text-light-100 hover:text-primary transition-colors font-medium"
              >
                Get in touch
              </button>
              
              <div className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative group py-2"
                  >
                    <span
                      className={`font-medium transition-colors ${
                        isActive(link.path) ? 'text-primary' : 'text-light-100 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                ))}
              </div>
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
                      className={`text-5xl sm:text-6xl font-display font-bold transition-colors ${
                        isActive(link.path) ? 'text-primary' : 'text-light-100 hover:text-primary'
                      }`}
                    >
                      {link.name}
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
                    className="text-3xl sm:text-4xl font-display text-primary hover:text-primary-400 transition-colors"
                  >
                    Get in touch →
                  </button>
                </motion.div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pb-8 flex gap-6 text-light-200"
              >
                <a href="https://instagram.com/i_ndahirwas_s" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Instagram
                </a>
                <a href="https://linkedin.com/in/rylan-phillips" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  LinkedIn
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
