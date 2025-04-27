import type { Metadata } from "next"
import Hero from "@/components/hero"
import TechStack from "@/components/tech-stack"
import CareerTimeline from "@/components/career-timeline"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Hobbies from "@/components/hobbies"
import AnimatedBackground from "@/components/animated-background"

export const metadata: Metadata = {
  title: "Yasar Abbas",
  description: "A timeline of my professional career, education, skills and interests",
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <div className="container mx-auto px-4 relative z-10">
        <Hero />
        <TechStack />
        <CareerTimeline />
        <Projects />
        <Education />
        <Hobbies />
      </div>
    </main>
  )
}

