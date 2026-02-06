import { motion } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaBehance, FaDribbble } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com/i_ndahirwas_s', label: 'Instagram' },
    { icon: FaLinkedinIn, href: 'https://linkedin.com/in/rylan-phillips', label: 'LinkedIn' },
    { icon: FaBehance, href: 'https://behance.net', label: 'Behance' },
    { icon: FaDribbble, href: 'https://dribbble.com', label: 'Dribbble' },
  ]

  return (
    <footer className="px-10 lg:px-16 py-6 bg-dark">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-200/50 hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-light-200/40 text-xs font-nav">
          © {currentYear} INEZA Ndahirwa Sosthene. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
