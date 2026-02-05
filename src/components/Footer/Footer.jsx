import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com/i_ndahirwas_s', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/in/rylan-phillips', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:ndahirwas@gmail.com', label: 'Email' },
    { icon: FaPhone, href: 'tel:+250791804052', label: 'Phone' },
  ]

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ]

  return (
    <footer className="bg-dark-100 border-t border-dark-50">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="bg-primary px-4 py-2 transform -skew-x-6">
                <span className="block skew-x-6 font-bold text-white text-xl">
                  NDAHIRWA
                </span>
              </div>
            </Link>
            <p className="text-light-200/70 max-w-xs">
              Digital Architect crafting exceptional user experiences and innovative mobile solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-light-100 font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-light-200/70 hover:text-primary transition-colors w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-light-100 font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 bg-dark-50 rounded-full flex items-center justify-center text-light-200/70 hover:bg-primary hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="space-y-2 text-light-200/70">
              <p>ndahirwas@gmail.com</p>
              <p>+250 791 804 052</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-light-200/50 text-sm">
            © {currentYear} INEZA Ndahirwa Sosthene. All rights reserved.
          </p>
          <p className="text-light-200/50 text-sm">
            Designed & Built with ❤️ in Kigali, Rwanda
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
