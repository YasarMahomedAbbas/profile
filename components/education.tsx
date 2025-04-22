"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react"
import { getEducation } from "@/utils/data-service"

export default function Education() {
  const educationData = getEducation()
  
  return (
    <section id="education" className="py-20 relative">
      <div className="timeline-connector h-full top-0"></div>

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

        <div className="relative space-y-20">
          {educationData.map((education, index) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative z-10 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
            >
              <div className="timeline-node" style={{ top: "2rem" }}></div>

              <div className={`glass-card p-6 max-w-lg ${index % 2 === 0 ? "mr-8" : "ml-8"} glow-border-secondary`}>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold glow-text-secondary">{education.degree}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{education.institution}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{education.period}</span>
                    </div>

                    <p className="text-muted-foreground mb-4">{education.description}</p>

                    <div>
                      <h4 className="flex items-center gap-2 font-medium mb-2">
                        <Award className="h-4 w-4 text-yellow-400" />
                        Achievements
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {education.achievements.map((achievement, i) => (
                          <li key={i} className="text-muted-foreground">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

