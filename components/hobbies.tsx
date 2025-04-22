"use client"

import { motion } from "framer-motion"
import { Camera, Bike, Book, Gamepad, Music, Plane, Mountain, Home, Monitor } from "lucide-react"
import Image from "next/image"
import { getProfileData } from "@/utils/data-service"

// Icon mapping for hobbies
const iconMap = {
  "Gaming": <Gamepad className="h-8 w-8" />,
  "Hiking": <Mountain className="h-8 w-8" />,
  "Home Automation": <Home className="h-8 w-8" />,
  "Photography": <Camera className="h-8 w-8" />,
  "Cycling": <Bike className="h-8 w-8" />,
  "Reading": <Book className="h-8 w-8" />,
  "Music Production": <Music className="h-8 w-8" />,
  "Travel": <Plane className="h-8 w-8" />
}

// Descriptions for hobbies
const hobbyDescriptions = {
  "Gaming": "Strategy games and immersive RPGs that challenge problem-solving skills.",
  "Hiking": "Exploring nature trails and mountain landscapes for physical activity and mental clarity.",
  "Home Automation": "Building and implementing smart home systems for convenience, efficiency, and technological exploration.",
  "Photography": "Capturing landscapes and urban scenes, with a focus on long exposure photography.",
  "Cycling": "Weekend trail riding and occasional participation in local cycling events.",
  "Reading": "Science fiction, technology trends, and biographies of innovators.",
  "Music Production": "Creating electronic music and experimenting with digital audio workstations.",
  "Travel": "Exploring new cultures and documenting experiences through photography."
}

export default function Hobbies() {
  const { personalInfo } = getProfileData()
  const hobbies = personalInfo.hobbies

  // Generate hobby data from the profile information
  const hobbiesData = hobbies.map((hobby, id) => ({
    id: id + 1,
    name: hobby,
    icon: iconMap[hobby as keyof typeof iconMap] || <Monitor className="h-8 w-8" />,
    description: hobbyDescriptions[hobby as keyof typeof hobbyDescriptions] || "A passionate interest that brings balance to my technical work.",
    image: "/placeholder.svg?height=300&width=400",
  }))

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
        <p className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          Beyond coding, these are the activities that keep me inspired and balanced.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbiesData.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={hobby.image || "/placeholder.svg"}
                  alt={hobby.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-center justify-center">
                  <div className="text-center p-4">
                    <motion.div
                      className="bg-primary/30 p-4 rounded-full mx-auto mb-4 backdrop-blur-sm border border-primary/40"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 glow-text-accent">{hobby.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground">{hobby.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

