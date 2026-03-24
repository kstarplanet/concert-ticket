"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

const pixelIcons = [
  // Star
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  // Heart
  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  // Music note
  "M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
]

interface FloatingPixel {
  id: number
  icon: string
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export function FloatingPixels() {
  const pixels = useMemo<FloatingPixel[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: pixelIcons[i % pixelIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 16,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {pixels.map((pixel) => (
        <motion.svg
          key={pixel.id}
          xmlns="http://www.w3.org/2000/svg"
          width={pixel.size}
          height={pixel.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute text-primary/30"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0.6, 0],
            scale: [0.5, 1, 0.8, 1, 0.5],
            y: [0, -100, -200, -300, -400],
            x: [0, 20, -20, 30, -10],
            rotate: [0, 45, -45, 90, 0],
          }}
          transition={{
            duration: pixel.duration,
            delay: pixel.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path d={pixel.icon} />
        </motion.svg>
      ))}
    </div>
  )
}
