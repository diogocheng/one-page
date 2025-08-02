'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function TemperatureSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://ext.same-assets.com/3039044760/2890122550.webp"
          alt="Dani Arnold walking on ice at sunrise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Temperature Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white"
      >
        <div className="relative">
          {/* Temperature Circle */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold mb-2">-40°</div>
                <div className="text-xl font-light">celsius</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wind Speed Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-20 left-6 md:left-12 text-white z-10"
      >
        <p className="text-lg">Wind speeds up to 120 km/h on the ice.</p>
      </motion.div>

      {/* Technical Data */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-20 right-6 md:right-12 text-white z-10 text-right"
      >
        <div className="space-y-2 text-sm font-mono">
          <div>GPS: N64°49'15"</div>
          <div>TMP: -14°C</div>
          <div>BPM: 79</div>
        </div>
      </motion.div>
    </section>
  )
}
