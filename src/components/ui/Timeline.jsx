"use client"
import { useScroll, useTransform, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export const Timeline = ({ data, title, subtitle }) => {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-dark font-sans px-10 lg:px-16 py-24"
      ref={containerRef}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column - Sticky Title & Subtitle */}
          <div className="lg:w-[400px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              {title && (
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white font-display font-medium"
                >
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-white/70 text-lg md:text-2xl font-display max-w-md"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* Right Column - Scrollable Timeline Steps */}
          <div className="flex-1" ref={ref}>
            <div className="relative pl-12">
              {/* Timeline Line */}
              <div
                style={{ height: height + "px" }}
                className="absolute left-3 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-white/20 via-white/10 to-transparent"
              >
                <motion.div
                  style={{
                    height: heightTransform,
                    opacity: opacityTransform,
                  }}
                  className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-primary via-primary-400 to-primary/50 rounded-full"
                />
              </div>

              {/* Steps */}
              <div className="flex flex-col">
                {data.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pb-16 last:pb-0"
                  >
                    {/* Circle indicator */}
                    <div className="absolute -left-12 top-1 w-6 h-6 rounded-full bg-dark border-2 border-white/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    
                    {/* Step Title */}
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                      {item.title}
                    </h3>
                    
                    {/* Step Content */}
                    {item.content}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
