import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import testimonials from '../../data/testimonials'

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-dark-50 rounded-2xl p-8 md:p-12"
          >
            {/* Quote Icon */}
            <div className="text-primary text-6xl font-display mb-6">"</div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-light-100 leading-relaxed mb-8 font-display italic">
              {testimonials[currentIndex].quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-yellow-400 flex items-center justify-center text-white font-bold text-xl">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div>
                <p className="text-light-100 font-semibold">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-light-200/70 text-sm">
                  {testimonials[currentIndex].position}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-light-200/30 hover:bg-light-200/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <motion.button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-light-200/30 flex items-center justify-center text-light-100 hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <HiChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-light-200/30 flex items-center justify-center text-light-100 hover:border-primary hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <HiChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCarousel
