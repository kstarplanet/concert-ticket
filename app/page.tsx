"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FloatingPixels } from "@/components/floating-pixels"

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/concert-crowd.jpg')",
          filter: "blur(4px) brightness(0.4)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Floating Pixels */}
      <FloatingPixels />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl text-primary mb-4"
            style={{ fontFamily: "var(--font-press-start)" }}
            animate={{
              textShadow: [
                "0 0 20px #C8A2C8",
                "0 0 40px #8A2BE2",
                "0 0 20px #C8A2C8",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CONCERT TICKET
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl text-secondary"
            style={{ fontFamily: "var(--font-press-start)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            design your concert ticket now!
          </motion.h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-xl md:text-2xl text-foreground/80 text-center max-w-md"
          style={{ fontFamily: "var(--font-vt323)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Create your own custom concert tickets with pixel-perfect style
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12"
        >
          <Link href="/creator">
            <motion.button
              className="relative px-8 py-4 text-sm md:text-base bg-primary text-primary-foreground rounded-lg overflow-hidden"
              style={{ fontFamily: "var(--font-press-start)" }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px #C8A2C8",
                  "0 0 40px #8A2BE2",
                  "0 0 20px #C8A2C8",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Design My Concert Ticket</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-primary/50"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            className="flex gap-2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary/60 rounded-sm"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
