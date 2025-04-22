"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, X } from "lucide-react"
import { getCareer, type Career } from "@/utils/data-service"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function CareerTimeline() {
  const allCareerData = getCareer()
  const [selectedJob, setSelectedJob] = useState<Career | null>(null)

  const careerData = useMemo(() => {
    const currentJob = allCareerData.find(job => job.period.includes("Present"))    
    if (!currentJob) return allCareerData

    const otherJobs = allCareerData.filter(job => job.id !== currentJob.id)
    return [currentJob, ...otherJobs]
  }, [allCareerData])

  const handleJobClick = (job: Career) => {
    setSelectedJob(job)
  }

  const handleCloseDialog = () => {
    setSelectedJob(null)
  }

  return (
    <section id="career" className="py-20">
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

        <div className="relative pt-10">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-16">
            {careerData.map((job, index) => (
              <div key={job.id} className="relative">
                <div className="absolute left-1/2 top-1 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-background" aria-hidden="true"></div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-start ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div
                      className={`glass-card p-6 glow-border-primary ${index % 2 === 0 ? "text-left" : "text-right"} cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
                      onClick={() => handleJobClick(job)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleJobClick(job)}
                    >
                      <div
                        className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                      >
                        {index % 2 === 0 && (
                          <>
                            <div>
                              <h3 className="text-xl font-bold glow-text-secondary">{job.title}</h3>
                              <h4 className="text-lg">{job.company}</h4>
                            </div>
                            <div className="flex items-center ml-auto pl-4">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground mr-2">{job.period}</span>
                              {index === 0 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 border border-primary/40 text-primary font-medium">
                                  Current
                                </span>
                              )}
                            </div>
                          </>
                        )}
                        {index % 2 !== 0 && (
                          <>
                            <div className="flex items-center mr-auto pr-4">
                              {index === 0 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 border border-primary/40 text-primary font-medium mr-2">
                                  Current
                                </span>
                              )}
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{job.period}</span>
                            </div>
                            <div className="text-right">
                              <h3 className="text-xl font-bold glow-text-secondary">{job.title}</h3>
                              <h4 className="text-lg">{job.company}</h4>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Detail Dialog */}
        <Dialog open={!!selectedJob} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
          <DialogContent className="sm:max-w-[625px] glass-card glow-border-primary">
            {selectedJob && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold glow-text-secondary">{selectedJob.title}</DialogTitle>
                  <DialogDescription className="text-lg">
                    {selectedJob.company} | <span className="text-sm text-muted-foreground">{selectedJob.period}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 grid gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-base">Key Responsibilities:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {selectedJob.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-base">Tech Stack:</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-sm rounded-full bg-primary/20 border border-primary/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <button type="button" className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

      </motion.div>
    </section>
  )
}

