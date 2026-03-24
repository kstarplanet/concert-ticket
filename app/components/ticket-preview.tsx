"use client"

import { forwardRef } from "react"
import { useTicket } from "@/lib/ticket-context"
import { TicketBarcode } from "./barcode"
import { ImageIcon } from "lucide-react"

interface TicketPreviewProps {
  className?: string
}

const FONT_PRESS_START = "'Press Start 2P', system-ui, monospace"
const FONT_PIXELIFY = "'Pixelify Sans', system-ui, sans-serif"
const FONT_VT323 = "'VT323', system-ui, monospace"

export const TicketPreview = forwardRef<HTMLDivElement, TicketPreviewProps>(
  function TicketPreview({ className = "" }, ref) {
    const { ticketData } = useTicket()

    return (
      <div
        ref={ref}
        id="printable-ticket"
        className={`relative w-full max-w-[600px] aspect-[16/7] rounded-lg overflow-hidden shadow-2xl ${className}`}
        style={{
          backgroundColor: "#C8A2C8",
          fontFamily: FONT_PIXELIFY
        }}
      >
        {/* Decorative corner cuts */}
        <div className="ticket-corner absolute top-0 left-0 w-4 h-4 rounded-br-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />
        <div className="ticket-corner absolute bottom-0 left-0 w-4 h-4 rounded-tr-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />
        <div className="ticket-corner absolute top-0 right-0 w-4 h-4 rounded-bl-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />
        <div className="ticket-corner absolute bottom-0 right-0 w-4 h-4 rounded-tl-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />
        <div className="ticket-corner absolute top-0 right-[92px] w-4 h-2 rounded-b-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />
        <div className="ticket-corner absolute bottom-0 right-[92px] w-4 h-2 rounded-t-full" style={{ backgroundColor: "#000000", zIndex: 50 }} />

        {/* Ticket perforation line */}
        <div className="absolute right-[100px] top-0 bottom-0 border-l-2 border-dashed border-black/30 z-10" />

        <div className="flex h-full">
          {/* Left + Middle Section */}
          <div className="relative flex-1 flex">
            {ticketData.image ? (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${ticketData.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, rgba(200, 162, 200, 0.90), rgba(212, 179, 212, 0.75), rgba(200, 162, 200, 0.90))"
                  }}
                />
              </div>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #C8A2C8, #d4b3d4, #C8A2C8)"
                }}
              />
            )}

            <div className="relative z-10 flex-1 p-3 md:p-4 flex flex-col justify-between">
              <div>
                <p className="text-[8px] md:text-[10px] tracking-widest mb-1" style={{ fontFamily: FONT_VT323, color: "rgba(0,0,0,0.6)" }}>
                  KSTARPLANET
                </p>
                <h2 className="text-lg md:text-2xl font-bold tracking-wider leading-tight" style={{ fontFamily: FONT_PRESS_START, color: "#000000" }}>
                  {ticketData.eventName || "MUSIC NIGHT"}
                </h2>
                <h3 className="text-base md:text-xl font-bold tracking-wide mt-1" style={{ fontFamily: FONT_PRESS_START, color: "#4B0082" }}>
                  {ticketData.artist || "ARTIST"}
                </h3>
                <p className="mt-2 text-xs md:text-sm font-bold uppercase" style={{ fontFamily: FONT_PRESS_START, color: "#000000" }}>
                  {ticketData.date ? new Date(ticketData.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "APR 15, 2026"}
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <p className="text-xs md:text-sm" style={{ fontFamily: FONT_VT323, color: "rgba(0,0,0,0.8)" }}>
                    {ticketData.venue || "VENUE NAME"}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[8px] uppercase opacity-60" style={{ fontFamily: FONT_VT323 }}>Seat</p>
                      <p className="text-sm md:text-lg font-bold" style={{ fontFamily: FONT_PRESS_START }}>
                        {ticketData.seat || "A12"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded mb-1 translate-x-2" style={{ backgroundColor: "rgba(75, 0, 130, 0.15)" }}>
                  <p className="text-sm md:text-base font-bold" style={{ fontFamily: FONT_PRESS_START, color: "#4B0082" }}>
                    {ticketData.zone || "VIP"}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 w-[100px] md:w-[140px] flex items-center justify-center p-2">
              {!ticketData.image && (
                <div className="w-full h-[85%] rounded-md overflow-hidden flex items-center justify-center border-2 border-dashed" style={{ backgroundColor: "rgba(0,0,0,0.1)", borderColor: "rgba(0,0,0,0.2)" }}>
                  <div className="flex flex-col items-center" style={{ color: "rgba(0,0,0,0.5)" }}>
                    <ImageIcon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-[10px] mt-1 text-center" style={{ fontFamily: FONT_VT323 }}>YOUR PHOTO</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Stub with Ticket No at Bottom */}
          <div
            className="w-[100px] flex flex-col items-center justify-between py-4 px-2"
            style={{ backgroundColor: "#FFFFFF", overflow: "visible" }}
          >
            {/* Top Label */}
            <p className="text-[8px] opacity-30 uppercase tracking-widest" style={{ fontFamily: FONT_VT323 }}>
              Admit One
            </p>

            {/* Barcode Container */}
            <div
              className="flex-1 flex items-center justify-center"
              style={{
                width: "100%",
                maxHeight: "100px",
                overflow: "visible",
                background: "transparent"
              }}
            >
              <TicketBarcode
                date={ticketData.date}
                seat={ticketData.seat}
              />
            </div>

            {/* Ticket No at Bottom - No Overlap */}
            <div className="text-center">
              <p className="text-[8px] uppercase opacity-60 leading-none" style={{ fontFamily: FONT_VT323 }}>
                Ticket No
              </p>
              <p className="text-[10px] font-bold mt-1" style={{ fontFamily: FONT_VT323, color: "#4B0082" }}>
                000613
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)