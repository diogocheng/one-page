'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/HeroSection'
import { ProfileSection } from '@/components/ProfileSection'
import { TemperatureSection } from '@/components/TemperatureSection'
import PowerBIAnalytics from '@/components/PowerBIAnalytics'
import { ProductSection } from '@/components/ProductSection'
import { IceClimbingSection } from '@/components/IceClimbingSection'
import LibrarySection from '@/components/LibrarySection'
import { FinalSection } from '@/components/FinalSection'

export default function Home() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProfileSection />
      <TemperatureSection />
      <LibrarySection />
      <PowerBIAnalytics />
      <ProductSection />
      <IceClimbingSection />
      <FinalSection />
    </div>
  )
}
