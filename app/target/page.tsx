"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TargetPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div dangerouslySetInnerHTML={{ __html: '<!-- flag{7h3_s0urc3_c0d3_n3v3r_l13s} -->' }} />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 terminal-text neon-glow">
            Welcome to the Target Page
          </h1>
          
          <div className="card-glow rounded-lg p-8 bg-card mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              🎯 Challenge Target
            </h2>
            <p className="text-foreground leading-relaxed mb-6">
              This is a simple demonstration page for the CTF challenge. 
              The flag you're looking for is hidden somewhere in the source code of this page.
            </p>
            <p className="text-muted-foreground text-sm">
              Use your browser's developer tools to inspect the HTML source code and find the flag!
            </p>
          </div>

          <div className="space-y-4">
            <div className="card-glow rounded-lg p-6 bg-card">
              <h3 className="text-lg font-semibold mb-3 text-secondary">
                💡 Tips for Beginners
              </h3>
              <ul className="text-left text-sm text-muted-foreground space-y-2">
                <li>• Right-click on the page and select "Inspect" or "View Source"</li>
                <li>• Press F12 to open Developer Tools</li>
                <li>• Look for HTML comments in the source code</li>
                <li>• Flags usually follow the format: flag{"{...}"}</li>
              </ul>
            </div>

            <Link href="/challenges/web-1">
              <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-card bg-transparent"
              >
                ← Back to Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}