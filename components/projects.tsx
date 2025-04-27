"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Maximize2, X } from "lucide-react"
import Image from "next/image"
import { getProjects, type Project } from "@/utils/data-service"

export default function Projects() {
  const projectsData = getProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 glow-text-primary text-center">Projects</h2>
        <p className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          A showcase of my personal and professional projects, highlighting my technical skills and problem-solving
          abilities.
        </p>

        <div className="flex justify-center">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Add title overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex items-center justify-center">
                  <h3 className="text-5xl font-bold text-white glow-text-accent">{project.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-secondary/20 border border-secondary/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-secondary/20 border border-secondary/40">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">Try it out</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-0 max-w-4xl w-full max-h-[90vh] overflow-auto glow-border-accent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-background/50 p-2 rounded-full text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-white glow-text-accent">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs rounded-full bg-secondary/20 border border-secondary/40">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-md transition-colors text-primary-foreground"
                >
                  <ExternalLink className="h-5 w-5" />
                  Try it out
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

