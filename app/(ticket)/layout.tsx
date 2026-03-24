"use client"

import { TicketProvider } from "@/lib/ticket-context"

export default function TicketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <TicketProvider>{children}</TicketProvider>
}
