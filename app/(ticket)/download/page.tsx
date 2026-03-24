"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import confetti from "canvas-confetti"
import { toPng } from "html-to-image"
import { Download, Printer, RotateCcw, ArrowLeft, Loader2 } from "lucide-react"
import { FloatingPixels } from "@/components/floating-pixels"
import { TicketPreview } from "@/components/ticket-preview"
import { Button } from "@/components/ui/button"

// Font URLs from Google Fonts
const FONT_URLS = {
  pressStart2P: "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2",
  pixelifySans: "https://fonts.gstatic.com/s/pixelifysans/v1/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TTp0E1f.woff2",
  vt323: "https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isRFJXGdg.woff2",
}

// Function to fetch font as base64 data URL
async function fetchFontAsDataURL(url: string): Promise<string> {
  try {
    const response = await fetch(url, { mode: "cors" })
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Failed to fetch font:", url, error)
    return ""
  }
}

// Build @font-face CSS with embedded base64 fonts
async function buildEmbeddedFontCSS(): Promise<string> {
  const [pressStart2P, pixelifySans, vt323] = await Promise.all([
    fetchFontAsDataURL(FONT_URLS.pressStart2P),
    fetchFontAsDataURL(FONT_URLS.pixelifySans),
    fetchFontAsDataURL(FONT_URLS.vt323),
  ])

  return `
    @font-face {
      font-family: 'Press Start 2P';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(${pressStart2P}) format('woff2');
    }
    @font-face {
      font-family: 'Pixelify Sans';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(${pixelifySans}) format('woff2');
    }
    @font-face {
      font-family: 'Pixelify Sans';
      font-style: normal;
      font-weight: 700;
      font-display: block;
      src: url(${pixelifySans}) format('woff2');
    }
    @font-face {
      font-family: 'VT323';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(${vt323}) format('woff2');
    }
  `
}

export default function DownloadPage() {
  const ticketRef = useRef<HTMLDivElement>(null)
  const confettiTriggered = useRef(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [embeddedFontCSS, setEmbeddedFontCSS] = useState<string>("")

  // Pre-fetch and embed fonts on mount
  useEffect(() => {
    const loadFonts = async () => {
      if (typeof document !== "undefined") {
        try {
          // Step 1: Build embedded font CSS (fetch as base64)
          const fontCSS = await buildEmbeddedFontCSS()
          setEmbeddedFontCSS(fontCSS)
          
          // Step 2: Wait for document fonts ready
          if (document.fonts) {
            await document.fonts.ready
            
            // Step 3: Explicitly load the pixel fonts at various sizes
            const fontPromises = [
              document.fonts.load("400 10px 'Press Start 2P'"),
              document.fonts.load("400 12px 'Press Start 2P'"),
              document.fonts.load("400 14px 'Press Start 2P'"),
              document.fonts.load("400 16px 'Press Start 2P'"),
              document.fonts.load("400 20px 'Press Start 2P'"),
              document.fonts.load("400 12px 'Pixelify Sans'"),
              document.fonts.load("400 16px 'Pixelify Sans'"),
              document.fonts.load("400 20px 'Pixelify Sans'"),
              document.fonts.load("700 16px 'Pixelify Sans'"),
              document.fonts.load("400 10px 'VT323'"),
              document.fonts.load("400 12px 'VT323'"),
              document.fonts.load("400 14px 'VT323'"),
              document.fonts.load("400 16px 'VT323'"),
            ]
            
            await Promise.allSettled(fontPromises)
          }
          
          // Step 4: Verify fonts are loaded
          await new Promise((resolve) => setTimeout(resolve, 500))
          setFontsLoaded(true)
        } catch (error) {
          console.error("Font loading error:", error)
          // Fallback timeout
          setTimeout(() => setFontsLoaded(true), 2000)
        }
      } else {
        setTimeout(() => setFontsLoaded(true), 2000)
      }
    }
    
    loadFonts()
  }, [])

  useEffect(() => {
    // Trigger confetti only once on page load
    if (!confettiTriggered.current) {
      confettiTriggered.current = true

      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }

        const particleCount = 50 * (timeLeft / duration)

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#C8A2C8", "#8A2BE2", "#FFFFFF", "#FFD700"],
        })

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#C8A2C8", "#8A2BE2", "#FFFFFF", "#FFD700"],
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [])

  const handleDownload = useCallback(async () => {
    const ticketElement = document.getElementById("printable-ticket")
    if (!ticketElement || !fontsLoaded) return

    setIsDownloading(true)

    try {
      // FORCED RE-RENDER: Create a hidden clone to ensure fonts are painted
      const hiddenContainer = document.createElement("div")
      hiddenContainer.style.cssText = "position: absolute; left: -9999px; top: -9999px; visibility: hidden;"
      document.body.appendChild(hiddenContainer)
      
      const ticketClone = ticketElement.cloneNode(true) as HTMLElement
      hiddenContainer.appendChild(ticketClone)
      
      // Force browser reflow on clone
      ticketClone.offsetHeight
      
      // Wait for document.fonts.ready again
      if (document.fonts) {
        await document.fonts.ready
        
        // Re-load fonts to be absolutely sure
        await Promise.allSettled([
          document.fonts.load("400 10px 'Press Start 2P'"),
          document.fonts.load("400 14px 'Press Start 2P'"),
          document.fonts.load("400 20px 'Press Start 2P'"),
          document.fonts.load("400 16px 'Pixelify Sans'"),
          document.fonts.load("700 16px 'Pixelify Sans'"),
          document.fonts.load("400 14px 'VT323'"),
        ])
      }

      // Wait 500ms for browser to fully paint fonts
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Remove hidden container
      document.body.removeChild(hiddenContainer)

      // Generate PNG with embedded base64 fonts
      const dataUrl = await toPng(ticketElement, {
        quality: 1,
        pixelRatio: 3, // High quality sharp pixels
        backgroundColor: null, // Keep transparency
        cacheBust: true,
        skipAutoScale: false,
        includeQueryParams: true,
        fontEmbedCSS: embeddedFontCSS, // BASE64 embedded fonts
        fetchRequestInit: {
          mode: "cors",
          credentials: "omit",
        },
        filter: (node) => {
          if (node instanceof HTMLElement && node.classList.contains("ticket-corner")) {
            return false
          }
          return true
        },
      })

      // Create hidden anchor and trigger download
      const link = document.createElement("a")
      link.download = "my-concert-ticket.png"
      link.href = dataUrl
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link)
        }
      }, 100)
    } catch (error) {
      console.error("Error generating image:", error)
      alert("There was an error generating your ticket. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }, [fontsLoaded, embeddedFontCSS])

  const handlePrint = useCallback(async () => {
    if (document.fonts) {
      await document.fonts.ready
    }
    setTimeout(() => {
      window.print()
    }, 200)
  }, [])

  return (
    <>
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Floating Pixels - Hidden during print */}
        <div className="no-print">
          <FloatingPixels />
        </div>

        {/* Header - Hidden during print */}
        <motion.header
          className="relative z-10 flex items-center justify-between p-4 md:p-6 no-print"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/creator">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              EDIT
            </Button>
          </Link>
          <h1
            className="text-sm md:text-base text-primary"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            THE OUTCOME
          </h1>
          <div className="w-20" />
        </motion.header>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 pb-8">
          <div className="flex flex-col items-center">
            {/* Success Message */}
            <motion.div
              className="text-center mb-8 no-print"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-xl md:text-2xl text-primary mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                TICKET READY!
              </h2>
              <p
                className="text-lg text-muted-foreground"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                Your custom concert ticket has been generated
              </p>
            </motion.div>

            {/* Ticket Display */}
            <motion.div
              className="w-full max-w-[700px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border no-print-wrapper">
                <TicketPreview ref={ticketRef} />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8 no-print"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={handleDownload}
                disabled={isDownloading || !fontsLoaded}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 disabled:opacity-50"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                <span className="text-xs">{isDownloading ? "Generating..." : "Download PNG"}</span>
              </Button>

              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-6 py-5"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                <Printer className="w-4 h-4 mr-2" />
                <span className="text-xs">Print Ticket</span>
              </Button>

              <Link href="/creator">
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10 px-6 py-5"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span className="text-xs">Start New</span>
                </Button>
              </Link>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              className="mt-12 text-center max-w-md no-print"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p
                className="text-muted-foreground text-base"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                TIP: For best results, print on cardstock paper and cut along the edges
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.5in;
          }
          
          body * {
            visibility: hidden !important;
          }
          
          #printable-ticket,
          #printable-ticket * {
            visibility: visible !important;
          }
          
          #printable-ticket {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 600px !important;
            max-width: 600px !important;
            box-shadow: none !important;
            border-radius: 8px !important;
          }
          
          .no-print,
          .no-print * {
            display: none !important;
            visibility: hidden !important;
          }
          
          .no-print-wrapper {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            backdrop-filter: none !important;
          }
          
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            background: white !important;
          }
          
          .ticket-corner {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
