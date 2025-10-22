"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HomePage() {
  const [username, setUsername] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleStart = () => {
    if (username.trim()) {
      localStorage.setItem("ctf_username", username)
      setSubmitted(true)
      setTimeout(() => router.push("/challenges"), 500)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 terminal-text neon-glow">{"> HackNest"}</h1>
          <p className="text-secondary text-lg mb-2">Beginner-Friendly CTF Challenge</p>
          <p className="text-muted-foreground">Total Duration: ~1 hour | Difficulty: Beginner</p>
        </div>

        {/* Welcome Card */}
        <div className="card-glow rounded-lg p-8 mb-8 bg-card">
          <h2 className="text-2xl font-bold mb-4 text-primary">Welcome to HackNest</h2>
          <p className="text-foreground mb-4 leading-relaxed">
            Ready to explore the world of cybersecurity? HackNest is a beginner-friendly Capture The Flag (CTF)
            challenge designed to introduce you to six major areas of cybersecurity:
          </p>
          <ul className="space-y-2 text-foreground mb-6">
            <li className="flex items-start">
              <span className="text-primary mr-3">▸</span>
              <span>
                <strong>Web Exploitation</strong> - Inspect and manipulate web content
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3">▸</span>
              <span>
                <strong>Cryptography</strong> - Decode encrypted messages
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">▸</span>
              <span>
                <strong>OSINT</strong> - Gather intelligence from public sources
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3">▸</span>
              <span>
                <strong>Steganography</strong> - Extract hidden data from images
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">▸</span>
              <span>
                <strong>Forensics</strong> - Analyze files for clues
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-3">▸</span>
              <span>
                <strong>Miscellaneous</strong> - Solve logic and puzzle challenges
              </span>
            </li>
          </ul>
          <p className="text-muted-foreground text-sm">
            Each challenge awards 50-125 points. Solve all 10 challenges to earn up to 850 points and complete the CTF!
          </p>
        </div>

        {/* Username Input */}
        <div className="card-glow rounded-lg p-8 bg-card">
          <label className="block text-sm font-semibold mb-3 text-primary">Enter Your Username</label>
          <div className="flex gap-3 flex-col sm:flex-row">
            <Input
              type="text"
              placeholder="Your hacker name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleStart()}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              maxLength={20}
            />
            <Button
              onClick={handleStart}
              disabled={!username.trim() || submitted}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              {submitted ? "Starting..." : "Start CTF"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your username will be saved locally and displayed on the leaderboard.
          </p>
        </div>
      </div>
    </main>
  )
}
