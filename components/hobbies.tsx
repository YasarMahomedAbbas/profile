"use client"

import { motion } from "framer-motion"
import { getProfileData, type HobbyItem } from "@/utils/data-service"
import { 
  Camera, 
  Bike, 
  Book, 
  Gamepad, 
  Music, 
  Plane, 
  Mountain, 
  Home, 
  Monitor, 
  Bot, 
  Brain,
  LucideIcon
} from "lucide-react"
import { useMemo } from "react"

// Icon mapping to dynamically import Lucide icons
const ICON_MAP: Record<string, LucideIcon> = {
  "Gamepad": Gamepad,
  "Mountain": Mountain,
  "Home": Home,
  "Camera": Camera,
  "Bike": Bike,
  "Book": Book,
  "Music": Music,
  "Plane": Plane,
  "Bot": Bot,
  "Brain": Brain
}

export default function Hobbies() {
  const { personalInfo } = getProfileData()
  
  // Map hobby data from profile-data.json and attach icon components
  const hobbies = useMemo(() => {
    return (personalInfo.hobbiesDetail || []).map((hobby, index) => {
      const IconComponent = ICON_MAP[hobby.icon] || Monitor
      
      return {
        id: index + 1,
        name: hobby.name,
        icon: IconComponent,
        description: hobby.description
      }
    })
  }, [personalInfo.hobbiesDetail])

  return (
    <section id="hobbies" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 glow-text-primary text-center">Hobbies & Interests</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Beyond coding, these are the activities that keep me inspired and balanced.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon
            
            return (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="glass-card overflow-hidden group"
              >
                <div className="p-6 flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-primary glow-border-accent flex-shrink-0"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 glow-text-accent">{hobby.name}</h3>
                    <p className="text-muted-foreground text-sm">{hobby.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

