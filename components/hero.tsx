"use client"

import { motion } from "framer-motion"
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
          MSc Computer Science graduate and experienced Lead Developer with expertise in Full Stack development, Unity3D, and AI technologies. Specializing in innovative solutions across web, mobile, and simulation platforms.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {personalInfo.highlightedSkills.map((skill: string, index: number) => (
            <span key={index} className="px-4 py-2 rounded-full glass-card glow-border-primary text-card-foreground">
              {skill}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

