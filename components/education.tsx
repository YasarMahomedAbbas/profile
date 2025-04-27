"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award, BookOpen, X, Info } from "lucide-react"
import { getEducation } from "@/utils/data-service"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// Define the type based on usage, assuming getEducation returns this structure
interface EducationItem {
  id: number | string;
  degree: string;
  institution: string;
  period: string;
  description: string;
  keyActivities: string[];
}

export default function Education() {
  const educationData = getEducation()
  const [selectedEducation, setSelectedEducation] = useState<EducationItem | null>(null)

  const handleEducationClick = (education: EducationItem) => {
    setSelectedEducation(education)
  }

  const handleCloseDialog = () => {
    setSelectedEducation(null)
  }

  return (
    <section id="education" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold mb-4 glow-text-primary text-center">Education</h2>
        <p className="text-lg text-muted-foreground mb-16 text-center max-w-2xl mx-auto">
          My academic journey and continuous learning path that built the foundation for my career.
        </p>

        <div className="relative pt-10">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" aria-hidden="true"></div>

          <div className="space-y-16">
            {educationData.map((education, index) => (
              <div key={education.id} className="relative">
                {/* Timeline Node */}
                <div className="absolute left-1/2 top-1 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-background" aria-hidden="true"></div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-start ${index % 2 === 0 ? "justify-start md:justify-start" : "justify-start md:justify-end"}`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} px-4 md:px-0 pl-8 md:pl-auto`}>
                    <div
                      className={`glass-card p-6 glow-border-primary text-left md:${index % 2 === 0 ? "text-left" : "text-right"} cursor-pointer hover:scale-[1.02] transition-transform duration-200`}
                      onClick={() => handleEducationClick(education)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleEducationClick(education)}
                    >
                      <div className={`flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                        {index % 2 === 0 && (
                          <>
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold glow-text-secondary">{education.degree}</h3>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{education.institution}</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 md:mt-0 md:ml-auto md:pl-4 flex-shrink-0">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{education.period}</span>
                            </div>
                          </>
                        )}
                        {index % 2 !== 0 && (
                          <>
                             <div className="flex items-center md:mr-auto md:pr-4 mb-2 md:mb-0 flex-shrink-0">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{education.period}</span>
                            </div>
                            <div className="flex-grow md:text-right">
                              <h3 className="text-xl font-bold glow-text-secondary">{education.degree}</h3>
                               <div className="flex items-center md:justify-end gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{education.institution}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className={`mt-3 text-left md:${index % 2 === 0 ? "text-left" : "text-right"}`}>
                        <button className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors">
                          <Info className="h-3.5 w-3.5 mr-1" />
                          View details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Detail Dialog */}
        <Dialog open={!!selectedEducation} onOpenChange={(isOpen) => !isOpen && handleCloseDialog()}>
          <DialogContent className="sm:max-w-[625px] glass-card glow-border-primary">
            {selectedEducation && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold glow-text-secondary">{selectedEducation.degree}</DialogTitle>
                  <DialogDescription className="text-lg">
                    {selectedEducation.institution} | <span className="text-sm text-muted-foreground">{selectedEducation.period}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 grid gap-4">
                  <p className="text-base text-muted-foreground">{selectedEducation.description}</p>

                  <div>
                    <h4 className="flex items-center gap-2 font-medium mb-2 text-base">
                      <Award className="h-5 w-5 text-yellow-400" />
                      Key Activities
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {selectedEducation.keyActivities.map((activity, i) => (
                        <li key={i}>
                          {activity}
                        </li>
                      ))}
                    </ul>
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

