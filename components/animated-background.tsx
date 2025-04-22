"use client"

import { useEffect, useRef } from "react"

// Helper function to convert HSL string (e.g., "210 100% 50%") to RGBA
function hslToRgba(hsl: string, alpha: number): string {
  const match = hsl.match(/([\d.]+) ([\d.]+)% ([\d.]+)%/) // Improved regex to handle decimals
  if (!match) return `rgba(0, 0, 0, ${alpha})` // Default to black on error

  let [_, h, s, l] = match.map(Number)
  s /= 100
  l /= 100

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }
  
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get computed styles for theme colors
    const computedStyle = getComputedStyle(document.body)
    const primaryGlow = computedStyle.getPropertyValue('--glow-primary').trim()
    const secondaryGlow = computedStyle.getPropertyValue('--glow-secondary').trim()
    const accentGlow = computedStyle.getPropertyValue('--glow-accent').trim()
    const lineColorHsl = computedStyle.getPropertyValue('--border').trim() || "240 3.7% 15.9%" // Fallback to dark border

    const particleColorsHsl = [primaryGlow, secondaryGlow, accentGlow].filter(Boolean)
    if (particleColorsHsl.length === 0) {
        // Provide default fallback colors if CSS variables are somehow not available
        particleColorsHsl.push("210 100% 50%", "280 100% 50%", "160 100% 50%");
    }

    const setCanvasDimensions = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      hslColor: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.hslColor = particleColorsHsl[Math.floor(Math.random() * particleColorsHsl.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        const opacity = 0.3 + Math.sin(Date.now() * 0.001) * 0.2
        ctx.fillStyle = hslToRgba(this.hslColor, opacity)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particlesArray: Particle[] = []
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle())
    }

    function connectParticles() {
      if (!ctx) return
      const maxDistance = 150
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = hslToRgba(lineColorHsl, opacity * 0.5)
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    let animationFrameId: number;
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    }
  }, [])

  // Use bg-background for the canvas element
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 bg-background" aria-hidden="true" />
}

