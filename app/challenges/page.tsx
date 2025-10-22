"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChallengeCard } from "@/components/challenge-card"
import { Navigation } from "@/components/navigation"
import { CHALLENGES } from "@/lib/challenges"

export default function ChallengesPage() {
  const [username, setUsername] = useState("")
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([])
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
    if (saved) {
      const solved = JSON.parse(saved)
      setSolvedChallenges(solved)
      setTotalPoints(solved.length * 100)
    }
  }, [router])

  return (
    <main className="min-h-screen bg-background">
      <Navigation username={username} points={totalPoints} />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 terminal-text neon-glow">{"> Challenges"}</h1>
          <p className="text-secondary">
            Solved: {solvedChallenges.length}/10 | Points: {totalPoints}/850
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 card-glow rounded-lg p-4 bg-card">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-primary">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round((solvedChallenges.length / 10) * 100)}%</span>
          </div>
          <div className="w-full bg-input rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${(solvedChallenges.length / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES.map((challenge) => (
            <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
              <ChallengeCard challenge={challenge} isSolved={solvedChallenges.includes(challenge.id)} />
            </Link>
          ))}
        </div>

        {/* Leaderboard Link */}
        <div className="mt-12 text-center">
          <Link href="/leaderboard">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">View Leaderboard</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
