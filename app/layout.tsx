import type { Metadata } from 'next'
import { Press_Start_2P, Pixelify_Sans, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-press-start'
})

const pixelifySans = Pixelify_Sans({ 
  subsets: ["latin"],
  variable: '--font-pixelify'
})

const vt323 = VT323({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-vt323'
})

export const metadata: Metadata = {
  title: 'Pixel Ticket Gen | Create Custom Concert Tickets',
  description: 'Design and download custom pixel-art concert tickets with our interactive generator',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${pressStart2P.variable} ${pixelifySans.variable} ${vt323.variable} font-pixelify antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
