'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function ProfileSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section id="experience" ref={ref} className="py-20 bg-gray-50 text-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://ext.same-assets.com/3039044760/4128589952.webp"
              alt="Thick ice covering Lake Baikal"
              className="w-full h-80 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600 mt-4 italic">
              The thick ice covering the deepest lake on earth offers a mesmerizing,
              crystal-clear view into its depths.
            </p>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Dani Arnold</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pro Team Mountaineering</p>
                <p className="font-medium">One of the top Swiss speed climbers</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                <p className="font-medium">22 Feb 1984</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">At Mammut since</p>
                <p className="font-medium">2011</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Too cold to climb? See how he transitions to the horizontal ice and conquers
                ten new ice routes in temperatures as low as -40°C.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
