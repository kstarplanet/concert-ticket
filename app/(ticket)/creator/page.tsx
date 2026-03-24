"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { FloatingPixels } from "@/components/floating-pixels"
import { TicketPreview } from "@/components/ticket-preview"
import { TicketForm } from "@/components/ticket-form"
import { Button } from "@/components/ui/button"

export default function CreatorPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Floating Pixels */}
      <FloatingPixels />

      {/* Header */}
      <motion.header
        className="relative z-10 flex items-center justify-between p-4 md:p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 hover:bg-primary/10"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK
          </Button>
        </Link>
        <h1
          className="text-sm md:text-base text-primary"
          style={{ fontFamily: "var(--font-press-start)" }}
        >
          THE CREATOR
        </h1>
        <div className="w-20" />
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Ticket Preview */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-lg text-primary mb-6 text-center lg:text-left w-full"
              style={{ fontFamily: "var(--font-press-start)" }}
            >
              LIVE PREVIEW
            </h2>
            <div className="w-full max-w-[600px]">
              <TicketPreview />
            </div>

            {/* Instruction Text */}
            <p
              className="mt-4 text-muted-foreground text-center text-lg"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              Your ticket updates in real-time as you type
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <div className="lg:pt-0">
            <TicketForm />

            {/* Generate Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href="/download">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                  style={{ fontFamily: "var(--font-press-start)" }}
                >
                  <span className="text-xs md:text-sm">GENERATE TICKET</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
