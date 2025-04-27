"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code, Database, Globe, Layout, Layers, Server, Smartphone, Terminal, 
  Palette, Cpu, Monitor 
} from "lucide-react"
import { getTechStack, type TechItem } from "@/utils/data-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [activeTab, setActiveTab] = useState<string>("all")
  
  const categories = ["all", ...Object.keys(techData)]
  
  // Flatten all tech items for "All" tab
  const allTechItems = Object.values(techData).flat()

  return (
    <section id="tech-stack" className="min-h-screen flex flex-col justify-center py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-2 flex-1 flex flex-col"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold glow-text-primary mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of technologies I've mastered throughout my professional journey, each contributing to the depth and versatility of my skillset.
          </p>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
          <div className="overflow-x-auto pb-4 mb-12 sm:mb-16 -mx-2 px-2">
            <TabsList className="inline-flex min-w-full justify-start sm:justify-center bg-card/40 backdrop-blur-md border border-border/50 rounded-lg p-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize data-[state=active]:glow-text-primary data-[state=active]:bg-background/60 whitespace-nowrap px-3 py-1.5 sm:px-4 sm:py-2 mx-0.5 sm:mx-1 text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0 flex-1 pt-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 gap-y-6 content-start">
              {allTechItems.map((tech, index) => (
                <TechItem 
                  key={tech.name} 
                  tech={tech} 
                  index={index}
                  selectedTech={selectedTech}
                  setSelectedTech={setSelectedTech}
                />
              ))}
            </div>
          </TabsContent>
          
          {Object.entries(techData).map(([category, technologies]) => (
            <TabsContent key={category} value={category} className="mt-0 flex-1 pt-4">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 gap-y-6 content-start">
                {technologies.map((tech, index) => (
                  <TechItem 
                    key={tech.name} 
                    tech={tech} 
                    index={index}
                    selectedTech={selectedTech}
                    setSelectedTech={setSelectedTech}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  )
}

// Extracted reusable TechItem component
function TechItem({ 
  tech, 
  index, 
  selectedTech, 
  setSelectedTech 
}: { 
  tech: TechItem; 
  index: number; 
  selectedTech: TechItem | null; 
  setSelectedTech: (tech: TechItem | null) => void 
}) {
  return (
    <div 
      className="relative"
      onMouseEnter={() => setSelectedTech(tech)}
      onMouseLeave={() => setSelectedTech(null)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="glass-card p-0.5 flex flex-col items-center text-center cursor-pointer shadow-glow-accent max-w-[8rem] mx-auto h-16"
      >
        <div className="h-6 w-6 mt-1 text-primary animate-pulse-glow">
          {iconMap[tech.icon as IconKey] || <Code />}
        </div>
        <h4 className="text-xs font-medium px-1 truncate w-full">{tech.name}</h4>
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
            <div className="glass-card p-3 rounded-md shadow-lg glow-border-accent">
              <h3 className="text-sm font-bold mb-1 glow-text-accent">{tech.name}</h3>
              <div>
                <h4 className="text-xs font-medium mb-0.5 text-foreground">Used in projects:</h4>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-foreground">
                  {tech.projects.map((project) => (
                    <li key={project}>{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

