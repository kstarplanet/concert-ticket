"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface TicketData {
  eventName: string
  artist: string
  venue: string
  date: string
  zone: string
  seat: string
  row: string
  image: string | null
}

interface TicketContextType {
  ticketData: TicketData
  updateTicketData: (data: Partial<TicketData>) => void
  resetTicketData: () => void
}

const defaultTicketData: TicketData = {
  eventName: "MUSIC NIGHT",
  artist: "BLACKPINK",
  venue: "SEOUL ARENA",
  date: "2026-04-15",
  zone: "VIP",
  seat: "A12",
  row: "5",
  image: null,
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [ticketData, setTicketData] = useState<TicketData>(defaultTicketData)

  const updateTicketData = (data: Partial<TicketData>) => {
    setTicketData((prev) => ({ ...prev, ...data }))
  }

  const resetTicketData = () => {
    setTicketData(defaultTicketData)
  }

  return (
    <TicketContext.Provider value={{ ticketData, updateTicketData, resetTicketData }}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTicket() {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider")
  }
  return context
}
