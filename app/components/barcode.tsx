"use client"

import Barcode from "react-barcode"

interface TicketBarcodeProps {
  date: string
  seat: string
  className?: string
}

// HARDCODED font family - NO CSS variables for html-to-image compatibility
const FONT_VT323 = "'VT323', system-ui, monospace"

export function TicketBarcode({ date, seat, className = "" }: TicketBarcodeProps) {
  // Format date to YYYYMMDD format
  const formattedDate = date
    ? date.replace(/-/g, "").slice(0, 8)
    : "20260415"

  // Create barcode value: DATE-SEAT (e.g., "20260612-35")
  const barcodeValue = `${formattedDate}-${seat || "00"}`

  // Generate a ticket number based on the barcode value
  const ticketNumber = barcodeValue
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString()
    .slice(-6)
    .padStart(6, "0")

  return (
    <div 
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ overflow: "visible", background: "transparent" }}
    >
      {/* Rotated barcode container - no absolute positioning */}
      <div 
        className="flex items-center justify-center"
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      >
        <Barcode
          value={barcodeValue}
          width={1.2}
          height={45}
          fontSize={0}
          margin={0}
          background="transparent"
          lineColor="#4B0082"
          displayValue={false}
        />
      </div>

      {/* Ticket number - positioned BELOW barcode, no rotation */}
      <p
        className="text-[7px] whitespace-nowrap tracking-wider mt-2"
        style={{ 
          fontFamily: FONT_VT323,
          color: "#4B0082"
        }}
      >
        TICKET NO: {ticketNumber}
      </p>
    </div>
  )
}
