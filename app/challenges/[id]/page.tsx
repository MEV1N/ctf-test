"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { CHALLENGES } from "@/lib/challenges"
import Link from "next/link"

export default function ChallengePage() {
  const params = useParams()
  const router = useRouter()
  const challengeId = params.id as string

  const [username, setUsername] = useState("")
  const [challenge, setChallenge] = useState<any>(null)
  const [flag, setFlag] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    const savedUsername = localStorage.getItem("ctf_username")
    if (!savedUsername) {
      router.push("/")
      return
    }
    setUsername(savedUsername)

    const found = CHALLENGES.find((c) => c.id === challengeId)
    if (!found) {
      router.push("/challenges")
      return
    }
    setChallenge(found)

    // Load solved challenges
    const saved = localStorage.getItem("ctf_solved")
    if (saved) {
      const solved = JSON.parse(saved)
      setSolvedChallenges(solved)
      setTotalPoints(solved.length * 100)
      if (solved.includes(challengeId)) {
        setIsCorrect(true)
      }
    }
  }, [challengeId, router])

  const handleSubmit = () => {
    if (!flag.trim()) {
      setFeedback("Please enter a flag")
      return
    }

    if (flag.toLowerCase() === challenge.flag.toLowerCase()) {
      setIsCorrect(true)
      setFeedback("✅ Correct! Flag accepted!")

      // Save to solved challenges
      const solved = [...solvedChallenges]
      if (!solved.includes(challengeId)) {
        solved.push(challengeId)
        localStorage.setItem("ctf_solved", JSON.stringify(solved))
        const totalPoints = solved.reduce((sum, id) => {
          const ch = CHALLENGES.find((c) => c.id === id)
          return sum + (ch?.points || 0)
        }, 0)
        setTotalPoints(totalPoints)
      }
    } else {
      setFeedback("❌ Incorrect flag. Try again or use a hint!")
    }
  }

  if (!challenge) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation username={username} points={totalPoints} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Loading challenge...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation username={username} points={totalPoints} />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/challenges">
          <Button variant="outline" className="mb-6 border-border text-foreground hover:bg-card bg-transparent">
            ← Back to Challenges
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenge Details */}
          <div className="lg:col-span-2">
            <div className="card-glow rounded-lg p-8 bg-card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 terminal-text neon-glow">{challenge.title}</h1>
                  <div className="flex gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded text-sm font-semibold">
                      {challenge.category}
                    </span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded text-sm font-semibold">
                      {challenge.points} pts
                    </span>
                  </div>
                </div>
                {isCorrect && <div className="text-3xl">✅</div>}
              </div>

              <p className="text-foreground leading-relaxed mb-6">{challenge.description}</p>

              {/* Hint Section */}
              <div className="mb-6">
                <Button
                  onClick={() => setShowHint(!showHint)}
                  variant="outline"
                  className="border-border text-foreground hover:bg-card"
                >
                  {showHint ? "▼ Hide Hint" : "▶ Show Hint"}
                </Button>
                {showHint && (
                  <div className="mt-4 p-4 bg-input rounded border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Hint 1:</strong> {challenge.hints[0]}
                    </p>
                    {challenge.hints[1] && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Hint 2:</strong> {challenge.hints[1]}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Challenge Content */}
              {challenge.content && (
                <div className="mb-6 p-4 bg-input rounded border border-border font-mono text-sm">
                  {challenge.content}
                </div>
              )}

              {/* Web-1 Challenge Button */}
              {challengeId === "web-1" && (
                <div className="mb-6">
                  <Link href="/target">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                      🎯 Visit Target Page
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click the button above to visit the page you need to inspect for this challenge.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Flag Submission */}
          <div className="lg:col-span-1">
            <div className="card-glow rounded-lg p-6 bg-card sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-primary">Submit Flag</h2>

              {isCorrect ? (
                <div className="mb-4 p-4 bg-primary/20 rounded border border-primary">
                  <p className="text-primary font-semibold">Challenge Solved!</p>
                  <p className="text-sm text-primary/80 mt-1">You earned {challenge.points} points</p>
                </div>
              ) : (
                <>
                  <Input
                    type="text"
                    placeholder="flag{...}"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    className="mb-3 bg-input border-border text-foreground placeholder:text-muted-foreground"
                    disabled={isCorrect}
                  />
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                    disabled={isCorrect}
                  >
                    Submit Flag
                  </Button>
                </>
              )}

              {feedback && (
                <div
                  className={`mt-4 p-3 rounded text-sm ${
                    isCorrect ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                  }`}
                >
                  {feedback}
                </div>
              )}

              {/* Challenge Info */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  <strong>Format:</strong> flag{"{...}"}
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Category:</strong> {challenge.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
