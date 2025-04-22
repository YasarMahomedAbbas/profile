"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 flex flex-col items-center text-center cursor-pointer"
                  onClick={() => setSelectedTech(tech)}
                >
                  <div className="h-12 w-12 mb-4 text-primary animate-pulse-glow">
                    {iconMap[tech.icon as IconKey] || <Code />}
                  </div>
                  <h4 className="font-medium">{tech.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              className="glass-card p-8 max-w-md w-full glow-border-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4 glow-text-accent">{selectedTech.name}</h3>
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Used in projects:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedTech.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setSelectedTech(null)}
                className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-md border border-primary/50 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

