"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code, Database, Globe, Layout, Layers, Server, Smartphone, Terminal, 
  Palette, Cpu, Monitor 
} from "lucide-react"
import { getTechStack, type TechItem } from "@/utils/data-service"

// Icon mapping for dynamic rendering
const iconMap = {
  Layout: <Layout />,
  Globe: <Globe />,
  Code: <Code />,
  Palette: <Palette />,
  Server: <Server />,
  Terminal: <Terminal />,
  Database: <Database />,
  Layers: <Layers />,
  Smartphone: <Smartphone />,
  Cpu: <Cpu />,
  Monitor: <Monitor />
}

type IconKey = keyof typeof iconMap

export default function TechStack() {
  const techData = getTechStack()
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null)

  return (
    <section id="tech-stack" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 glow-text-primary text-center">Tech Stack</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Technologies I've mastered throughout my career, each connected to projects where they were applied.
        </p>

        {Object.entries(techData).map(([category, technologies], categoryIndex) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 glow-text-secondary">{category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {technologies.map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="relative"
                  onMouseEnter={() => setSelectedTech(tech)}
                  onMouseLeave={() => setSelectedTech(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card p-1 flex flex-col items-center text-center cursor-pointer shadow-glow-accent max-w-[10rem] mx-auto"
                  >
                    <div className="h-8 w-8 mb-2 text-primary animate-pulse-glow">
                      {iconMap[tech.icon as IconKey] || <Code />}
                    </div>
                    <h4 className="text-xs font-medium">{tech.name}</h4>
                  </motion.div>
                  
                  <AnimatePresence>
                    {selectedTech === tech && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-36 z-10"
                      >
                        <div className="glass-card p-4 rounded-md shadow-lg glow-border-accent">
                          <h3 className="text-lg font-bold mb-2 glow-text-accent">{selectedTech.name}</h3>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Used in projects:</h4>
                            <ul className="list-disc pl-4 space-y-1 text-xs">
                              {selectedTech.projects.map((project) => (
                                <li key={project}>{project}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

