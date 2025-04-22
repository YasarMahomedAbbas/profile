"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { getProfileData } from "@/utils/data-service"

export default function Hero() {
  const profileData = getProfileData()
  const { personalInfo } = profileData
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text-primary">{personalInfo.name}</h1>
        <h2 className="text-2xl md:text-3xl mb-8 glow-text-secondary">{personalInfo.title}</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          I craft engaging digital experiences with a focus on performance and user experience. Explore my journey
          through technology and design.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {Object.keys(profileData.techStack).slice(0, 5).map((category, index) => (
            <span key={index} className="px-4 py-2 rounded-full glass-card glow-border-primary text-card-foreground">
              {category}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ArrowDown className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

