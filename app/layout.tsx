import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HackNest - Beginner CTF",
  description: "A beginner-friendly Capture The Flag challenge website",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div dangerouslySetInnerHTML={{ __html: '<!-- ROT13 Challenge: synt{e0g13_q3p1cu3e3q_5hppr54h11l} -->' }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
