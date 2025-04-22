"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { getCareer, type Career } from "@/utils/data-service"

export default function CareerTimeline() {
  const careerData = getCareer()
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const toggleJob = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id)
  }

  return (
    <section id="career" className="py-20 relative">
      <div className="timeline-connector h-full top-0"></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 glow-text-primary text-center">Career Journey</h2>
        <p className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          My professional path through the tech industry, highlighting key roles and achievements.
        </p>

        <div className="relative space-y-20">
          {careerData.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative z-10 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
            >
              <div className="timeline-node" style={{ top: "2rem" }}></div>

              <div className={`glass-card p-6 max-w-lg ${index % 2 === 0 ? "mr-8" : "ml-8"} glow-border-primary`}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleJob(job.id)}>
                  <div>
                    <h3 className="text-xl font-bold glow-text-secondary">{job.title}</h3>
                    <h4 className="text-lg">{job.company}</h4>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{job.period}</span>
                    {expandedJob === job.id ? (
                      <ChevronUp className="ml-2 h-5 w-5" />
                    ) : (
                      <ChevronDown className="ml-2 h-5 w-5" />
                    )}
                  </div>
                </div>

                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Responsibilities:</h5>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Tech Stack:</h5>
                      <div className="flex flex-wrap gap-2">
                        {job.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-sm rounded-full bg-primary/20 border border-primary/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

