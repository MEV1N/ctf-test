"use client"

interface Challenge {
  id: string
  title: string
  category: string
  points: number
  description: string
}

interface ChallengeCardProps {
  challenge: Challenge
  isSolved: boolean
}

export function ChallengeCard({ challenge, isSolved }: ChallengeCardProps) {
  return (
    <div
      className={`card-glow-hover card-glow rounded-lg p-6 bg-card cursor-pointer transition-all ${
        isSolved ? "border-primary/50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-foreground flex-1">{challenge.title}</h3>
        {isSolved && <span className="text-2xl">✅</span>}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">{challenge.category}</span>
        <span className="px-2 py-1 bg-secondary/20 text-secondary rounded text-xs font-semibold">
          {challenge.points} pts
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Status:{" "}
          <span className={isSolved ? "text-primary" : "text-muted-foreground"}>
            {isSolved ? "Solved ✓" : "Unsolved"}
          </span>
        </p>
      </div>
    </div>
  )
}
