'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

export function FinalSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="watch" ref={ref} className="bg-gray-50 text-black">
      {/* Success Story */}
      <div className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold leading-tight">
                At the beginning of the expedition, it wasn't clear whether
                there would be any opportunities to climb at all. In the end,
                the expedition was a complete success. Ten new routes on the
                famous cliffs of Olkhon Island.
              </h2>
            </motion.div>

            {/* Right Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://ext.same-assets.com/3039044760/2703123805.webp"
                alt="Success celebration"
                className="w-full h-64 object-cover rounded-lg"
              />
              <img
                src="https://ext.same-assets.com/3039044760/3330057283.webp"
                alt="Final climb"
                className="w-full h-64 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Nordwand Knit High GTX Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Product */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="https://ext.same-assets.com/3039044760/3561416799.webp"
                alt="Nordwand Knit High GTX boots"
                className="w-full max-w-md mx-auto"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="text-sm text-orange-500 flex items-center space-x-2">
                <span>Men</span>
                <span>Women</span>
              </div>

              <h3 className="text-3xl font-bold leading-tight">
                The crunch under the soles of the{' '}
                <span className="text-orange-500">Nordwand Knit High GTX</span>{' '}
                boots as they meet the icy surface. The breathtaking light of the
                far north at nightfall. Pristine routes in an enchanting frosty landscape.
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Three years developing the material, specifications and technologies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>3D knitted textile: stretchy and form-fitting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Lighter. Excellent ventilation.</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">Insulation rating: -30°C High-performance cold insulation</span>
                </div>
              </div>

              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Shop Shoes</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Final Quote */}
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h4 className="text-3xl md:text-4xl font-light mb-8 text-gray-300">
              A sublime moment in a spectacular setting.
            </h4>

            {/* Product Showcase */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <span className="text-orange-500">Eigerjoch Pro IN Hooded Jacket</span>
              <span className="text-orange-500">Nordwand Knit High GTX</span>
              <span className="text-orange-500">Nordwand MIPS Helmet</span>
              <span className="text-orange-500">Nordwand Pro HS Pants</span>
              <span className="text-orange-500">Nordwand Pro HS Hooded Jacket</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
