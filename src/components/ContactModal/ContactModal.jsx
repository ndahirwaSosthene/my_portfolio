import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { HiX, HiMail } from 'react-icons/hi'

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate form submission (replace with actual service like Formspree)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitted(false)
      onClose()
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 via-primary/10 to-dark animate-pulse" 
                   style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-700/90 to-black/95" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 py-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
                aria-label="Close modal"
              >
                <HiX size={24} />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="w-10 h-10 mx-auto mb-6 text-white">
                      <HiMail className="w-full h-full" />
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Let's Talk
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Have a project in mind? Let's create
                      <br />
                      <span className="text-white">something amazing together.</span>
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full h-14 text-base bg-white/10 border ${
                          errors.name ? 'border-red-400' : 'border-white/20'
                        } text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-200 shadow-lg rounded-2xl px-4`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-300 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full h-14 text-base bg-white/10 border ${
                          errors.email ? 'border-red-400' : 'border-white/20'
                        } text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-200 shadow-lg rounded-2xl px-4`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-300 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full text-base bg-white/10 border ${
                          errors.message ? 'border-red-400' : 'border-white/20'
                        } text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all duration-200 shadow-lg rounded-2xl px-4 py-4 resize-none`}
                        placeholder="Tell me about your project..."
                      />
                      {errors.message && (
                        <p className="text-red-300 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 bg-white text-primary font-semibold rounded-2xl shadow-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </form>

                  {/* Footer */}
                  <div className="text-center mt-6">
                    <p className="text-white/50 text-xs leading-relaxed">
                      Or email me directly at{" "}
                      <a href="mailto:ndahirwas@gmail.com" className="text-white/70 hover:text-white underline transition-colors">
                        ndahirwas@gmail.com
                      </a>
                    </p>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Thank you for reaching out.
                    <br />
                    <span className="text-white">I'll get back to you soon.</span>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal
