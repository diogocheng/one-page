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
          src="/padeu2.jpg"
          alt="Padel tournament"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60" />
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
                <div className="text-6xl font-bold mb-2">21</div>
                <div className="text-xl font-light">Times Played</div>
                <div className="text-xl font-light">August</div>
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
        className="absolute bottom-32 left-6 md:left-12 text-white z-10"
      >
        <p className="text-lg">Diogo has played 21 times in the month of August</p>
      </motion.div>

      {/* Technical Data */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-32 right-6 md:right-12 text-white z-10 text-right"
      >
        <div className="space-y-2 text-sm font-mono">
          <div>67% Win Rate in August</div>
          <div>Biggest Streak of 6 games in a row</div>
          <div>Has played the most in Douro Padel</div>
        </div>
      </motion.div>
    </section>
  )
}
