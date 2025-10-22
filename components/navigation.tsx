"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  username: string
  points: number
}

export function Navigation({ username, points }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/challenges" className="flex items-center gap-2">
          <span className="text-2xl font-bold terminal-text neon-glow">HackNest</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/challenges"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/challenges" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Challenges
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm font-semibold transition-colors ${
              pathname === "/leaderboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Leaderboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Player</p>
            <p className="text-sm font-semibold text-primary">{username}</p>
          </div>
          <div className="text-right border-l border-border pl-4">
            <p className="text-xs text-muted-foreground">Points</p>
            <p className="text-sm font-semibold text-secondary">{points}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
