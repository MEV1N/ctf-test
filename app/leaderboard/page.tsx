"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

interface LeaderboardEntry {
  username: string
  points: number
  solved: number
}

export default function LeaderboardPage() {
  const [username, setUsername] = useState("")
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const savedUsername = localStorage.getItem("ctf_username")
    if (!savedUsername) {
      router.push("/")
      return
    }
    setUsername(savedUsername)

    // Load solved challenges
    const saved = localStorage.getItem("ctf_solved")
    const solved = saved ? JSON.parse(saved) : []
    const points = solved.length * 100
    setTotalPoints(points)

    // Create leaderboard entry for current user
    const entry: LeaderboardEntry = {
      username: savedUsername,
      points,
      solved: solved.length,
    }

    // Load all leaderboard entries from localStorage
    const allEntries = localStorage.getItem("ctf_leaderboard")
    const entries: LeaderboardEntry[] = allEntries ? JSON.parse(allEntries) : []

    // Update or add current user
    const existingIndex = entries.findIndex((e) => e.username === savedUsername)
    if (existingIndex >= 0) {
      entries[existingIndex] = entry
    } else {
      entries.push(entry)
    }

    // Sort by points (descending)
    entries.sort((a, b) => b.points - a.points)

    // Save back to localStorage
    localStorage.setItem("ctf_leaderboard", JSON.stringify(entries))

    setLeaderboard(entries)
  }, [router])

  return (
    <main className="min-h-screen bg-background">
      <Navigation username={username} points={totalPoints} />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 terminal-text neon-glow">{"> Leaderboard"}</h1>
          <p className="text-secondary">Top Hackers</p>
        </div>

        {/* Leaderboard Table */}
        <div className="card-glow rounded-lg overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-input">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-primary">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Points</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary">Solved</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No entries yet. Start the CTF to appear on the leaderboard!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry, index) => (
                    <tr
                      key={entry.username}
                      className={`border-b border-border transition-colors ${
                        entry.username === username ? "bg-primary/10" : "hover:bg-input"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-foreground">
                        {entry.username}
                        {entry.username === username && <span className="ml-2 text-xs text-primary">(You)</span>}
                      </td>
                      <td className="px-6 py-4 text-secondary font-semibold">{entry.points}</td>
                      <td className="px-6 py-4 text-secondary">{entry.solved}/10</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link href="/challenges">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Back to Challenges</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
