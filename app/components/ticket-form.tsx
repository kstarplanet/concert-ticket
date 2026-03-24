"use client"

import { useTicket } from "@/lib/ticket-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useRef } from "react"
import { motion } from "framer-motion"

export function TicketForm() {
  const { ticketData, updateTicketData } = useTicket()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        updateTicketData({ image: event.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const formFields = [
    { id: "eventName", label: "Event Name", type: "text", placeholder: "MUSIC NIGHT" },
    { id: "artist", label: "Performer / Artist", type: "text", placeholder: "BLACKPINK" },
    { id: "date", label: "Date", type: "date", placeholder: "" },
    { id: "venue", label: "Venue", type: "text", placeholder: "SEOUL ARENA" },
    { id: "zone", label: "Zone", type: "text", placeholder: "VIP / ROCK / GA" },
    { id: "seat", label: "Seat", type: "text", placeholder: "A12" },
    { id: "row", label: "Row", type: "text", placeholder: "5" },
  ] as const

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2
        className="text-lg text-primary mb-6"
        style={{ fontFamily: "var(--font-press-start)" }}
      >
        CUSTOMIZE
      </h2>

      <div className="grid gap-4">
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Label
              htmlFor={field.id}
              className="text-sm text-muted-foreground mb-1.5 block"
              style={{ fontFamily: "var(--font-vt323)" }}
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={ticketData[field.id]}
              onChange={(e) => updateTicketData({ [field.id]: e.target.value })}
              className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
              style={{ fontFamily: "var(--font-pixelify)" }}
            />
          </motion.div>
        ))}

        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Label
            className="text-sm text-muted-foreground mb-1.5 block"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            Upload Photo
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-dashed border-2 border-primary/50 bg-transparent hover:bg-primary/10 text-primary"
            style={{ fontFamily: "var(--font-vt323)" }}
          >
            <Upload className="w-4 h-4 mr-2" />
            {ticketData.image ? "Change Photo" : "Choose Photo"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
