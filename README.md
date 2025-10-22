# HackNest - Beginner-Friendly CTF Website

A browser-based Capture The Flag (CTF) challenge website designed for complete beginners to learn cybersecurity concepts in about 1-2 hours.

## Project Overview

HackNest is an interactive CTF platform featuring 10 beginner-level challenges covering major cybersecurity areas:
- Web Exploitation (2 challenges)
- Cryptography (2 challenges)
- OSINT - Open Source Intelligence (2 challenges)
- Steganography (1 challenge)
- Forensics (1 challenge)
- Miscellaneous - Logic Puzzles (2 challenges)

## Features

- **Home Page**: Welcome screen with username entry
- **Challenges Grid**: Browse all 10 challenges with status indicators
- **Challenge Pages**: Detailed challenge descriptions with hints and flag submission
- **Leaderboard**: Real-time scoring and ranking system
- **Supabase Integration**: Persistent data storage for users, challenges, and scores
- **Dark Theme**: Terminal-inspired design with neon accents (green, blue, pink)
- **Responsive Design**: Works on desktop and mobile devices
- **Flag Validation**: Enforced flag{...} format with case-insensitive matching

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **State Management**: React hooks with localStorage fallback
- **Font**: Geist (sans) and Geist Mono (monospace)

## Project Structure

\`\`\`
app/
├── page.tsx                 # Home page with username entry
├── layout.tsx              # Root layout with metadata
├── globals.css             # Global styles and design tokens
├── challenges/
│   ├── page.tsx           # Challenges grid view
│   └── [id]/
│       └── page.tsx       # Individual challenge page
└── leaderboard/
    └── page.tsx           # Leaderboard view

components/
├── navigation.tsx         # Top navigation bar
└── challenge-card.tsx     # Challenge card component

lib/
├── challenges.ts          # Challenge data and definitions
└── supabase/
    ├── client.ts          # Client-side Supabase setup
    └── server.ts          # Server-side Supabase setup

scripts/
└── 001_create_ctf_tables.sql  # Database schema and initial data
\`\`\`

## Design System

### Color Palette
- **Background**: #0a0e27 (Dark blue-black)
- **Primary**: #00ff88 (Neon green)
- **Secondary**: #00d4ff (Neon cyan)
- **Accent**: #ff006e (Neon pink)
- **Card**: #1a1f3a (Dark blue)
- **Border**: #2a3050 (Subtle blue)

### Typography
- **Headings**: Geist (sans-serif)
- **Body**: Geist (sans-serif)
- **Terminal/Code**: Geist Mono (monospace)

## Challenges (10 Total)

### Web Exploitation (2 challenges)
1. **Hidden in Plain Sight** - 50 points
   - Inspect HTML source code to find the flag
   - Flag: `flag{7h3_s0urc3_c0d3_n3v3r_l13s_a9f2b8}`

2. **SQL Injection Basics** - 100 points
   - Exploit SQL injection vulnerability
   - Flag: `flag{sql_1nj3ct10n_pwn3d_k8j7h6}`

### Cryptography (2 challenges)
3. **Caesar's Secret** - 75 points
   - Decrypt Caesar cipher (shift of 3)
   - Flag: `flag{x9k2_c4es4r_d3cr7pt3d_8m1n}`

4. **ROT13 Decoder** - 75 points
   - Decode ROT13 encoded message
   - Flag: `flag{r0t13_d3c1ph3r3d_z2x9c8}`

### OSINT (2 challenges)
5. **OSINT Investigation** - 100 points
   - Extract information from fake profile
   - Flag: `flag{m3t4d4t4_h4rv3st3d_7j9k3l}`

6. **Email OSINT** - 100 points
   - Find flag hidden in email content
   - Flag: `flag{3m41l_1nt3ll1g3nc3_u6t5r4}`

### Steganography (1 challenge)
7. **Hidden Message** - 75 points
   - Decode hidden message in image metadata
   - Flag: `flag{h1dd3n_1n_p1x3ls_q8w7e2}`

### Forensics (1 challenge)
8. **File Forensics** - 100 points
   - Decode Base64 encoded file content
   - Flag: `flag{b4s364_d3c0d3d_f1l3s_p9o8i7}`

### Miscellaneous (2 challenges)
9. **Logic Puzzle** - 50 points
   - Solve word logic puzzle
   - Flag: `flag{l0g1c_puzzl3_m4st3r_v5n4m1}`

10. **Binary Code** - 125 points
    - Decode binary to ASCII
    - Flag: `flag{b1n4ry_t0_4sc11_m9n8b7}`

## Scoring System

- **Total Possible Points**: 850 points
- **Points per Challenge**: 50-125 points (varies by difficulty)
- **Completion**: Solve all 10 challenges to earn maximum points

## How to Use

1. **Start**: Enter your username on the home page
2. **Browse**: View all 10 challenges on the challenges grid
3. **Solve**: Click on a challenge to view details and hints
4. **Submit**: Enter the flag in the format \`flag{...}\`
5. **Track**: Monitor your progress and points
6. **Compete**: Check the leaderboard to see rankings

## Database Schema

### ctf_users
- \`id\`: UUID (Primary Key)
- \`username\`: TEXT (Unique)
- \`total_points\`: INTEGER
- \`challenges_solved\`: INTEGER
- \`created_at\`: TIMESTAMP
- \`updated_at\`: TIMESTAMP

### ctf_challenges
- \`id\`: TEXT (Primary Key)
- \`title\`: TEXT
- \`category\`: TEXT
- \`description\`: TEXT
- \`points\`: INTEGER
- \`flag\`: TEXT
- \`hints\`: TEXT[] (Array)
- \`content\`: TEXT
- \`created_at\`: TIMESTAMP

### user_challenges
- \`id\`: UUID (Primary Key)
- \`user_id\`: UUID (Foreign Key → ctf_users)
- \`challenge_id\`: TEXT (Foreign Key → ctf_challenges)
- \`solved_at\`: TIMESTAMP
- Unique constraint on (user_id, challenge_id)

## Gameplay Duration

- **Total Time**: ~1-2 hours
- **Per Challenge**: ~6-12 minutes average
- **Difficulty**: Beginner-friendly with hints

## Installation & Deployment

### Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### Deploy to Vercel
\`\`\`bash
vercel deploy
\`\`\`

## Change Log

### Version 2.1.0 - Security & UI Improvements
**Date**: 2024-10-22

#### Security Enhancements
- [x] **Randomized Flags**: Replaced all predictable flags with cryptographically secure random strings
- [x] **Answer Removal**: Cleaned up challenge descriptions and content to remove direct answers
- [x] **UI Sanitization**: Removed hint text that directly revealed solutions
- [x] **Database Updates**: Updated SQL schema with new secure flags

#### Flag Changes (Old → New)
- Web-1: `flag{inspect_the_source}` → `flag{7h3_s0urc3_c0d3_n3v3r_l13s_a9f2b8}`
- Crypto-1: `flag{caesar_cipher_is_easy}` → `flag{x9k2_c4es4r_d3cr7pt3d_8m1n}`
- OSINT-1: `flag{42_1998}` → `flag{m3t4d4t4_h4rv3st3d_7j9k3l}`
- Stego-1: `flag{stego_is_fun}` → `flag{h1dd3n_1n_p1x3ls_q8w7e2}`
- Forensics-1: `flag{file_forensics_fun}` → `flag{b4s364_d3c0d3d_f1l3s_p9o8i7}`
- Misc-1: `flag{short}` → `flag{l0g1c_puzzl3_m4st3r_v5n4m1}`
- Web-2: `flag{sql_injection_works}` → `flag{sql_1nj3ct10n_pwn3d_k8j7h6}`
- Crypto-2: `flag{rot13_is_fun}` → `flag{r0t13_d3c1ph3r3d_z2x9c8}`
- OSINT-2: `flag{email_osint_works}` → `flag{3m41l_1nt3ll1g3nc3_u6t5r4}`
- Misc-2: `flag{binary}` → `flag{b1n4ry_t0_4sc11_m9n8b7}`

#### Content Cleanup
- Removed direct answers from challenge descriptions
- Sanitized SQL injection example to avoid giving away solutions
- Updated OSINT challenges to remove explicit flag format hints
- Cleaned up steganography and logic puzzle answer reveals
- Modified email OSINT to remove direct flag disclosure

#### Files Modified
- `lib/challenges.ts` - Updated all flags and cleaned descriptions
- `scripts/001_create_ctf_tables.sql` - Updated database schema with new flags
- `README.md` - Documented security improvements and new flag values

#### Security Benefits
- **Unpredictable Flags**: Random alphanumeric strings prevent guessing
- **No Answer Leakage**: Challenge content no longer reveals solutions
- **Better Challenge Integrity**: Players must solve challenges legitimately
- **Enhanced Learning**: Forces participants to use intended solving methods

### Version 2.0.0 - Supabase Integration & 10 Challenges
**Date**: 2024-10-22

#### Major Updates
- [x] Expanded from 6 to 10 challenges
- [x] Integrated Supabase for persistent data storage
- [x] Created database schema with RLS policies
- [x] Added dynamic point system (50-125 points per challenge)
- [x] Updated scoring to reflect individual challenge points
- [x] Enhanced flag validation with format enforcement
- [x] Added 4 new challenges (SQL Injection, ROT13, Email OSINT, Binary Code)

#### New Challenges Added
- SQL Injection Basics (Web Exploitation) - 100 points
- ROT13 Decoder (Cryptography) - 75 points
- Email OSINT (OSINT) - 100 points
- Binary Code (Miscellaneous) - 125 points

#### Database Changes
- Created \`ctf_users\` table for user management
- Created \`ctf_challenges\` table for challenge data
- Created \`user_challenges\` table for tracking solved challenges
- Implemented Row Level Security (RLS) policies
- Inserted all 10 challenges with proper scoring

#### Code Changes
- Added Supabase client utilities (\`lib/supabase/client.ts\`, \`lib/supabase/server.ts\`)
- Updated \`lib/challenges.ts\` with 10 challenges and dynamic points
- Updated \`app/challenges/page.tsx\` to show 10/10 progress
- Updated \`app/challenges/[id]/page.tsx\` to calculate dynamic points
- Updated \`app/leaderboard/page.tsx\` to show 10 challenges
- Updated \`app/page.tsx\` to show 850 total points

#### Current Status
✅ **Complete** - All 10 challenges configured with Supabase integration
- Database schema created and deployed
- All 10 challenges with proper scoring (50-125 points)
- Dynamic point calculation implemented
- Leaderboard updated for 10 challenges
- RLS policies configured for security
- Ready for production deployment

### Version 1.0.0 - Initial Release
**Date**: 2024-10-22

#### Features Added
- [x] Home page with username entry
- [x] Challenges grid with 6 beginner-level challenges
- [x] Individual challenge pages with descriptions and hints
- [x] Flag submission system with validation
- [x] Real-time score tracking
- [x] Leaderboard with ranking system
- [x] Navigation bar with current player info
- [x] Dark theme with neon accents
- [x] Responsive design for mobile and desktop
- [x] Local storage for progress persistence

#### Components Created
- \`app/page.tsx\` - Home page
- \`app/challenges/page.tsx\` - Challenges grid
- \`app/challenges/[id]/page.tsx\` - Challenge detail page
- \`app/leaderboard/page.tsx\` - Leaderboard
- \`components/navigation.tsx\` - Navigation bar
- \`components/challenge-card.tsx\` - Challenge card component
- \`lib/challenges.ts\` - Challenge data

#### Current Status
✅ **Complete** - All features implemented and tested

## Future Enhancements

- [ ] User authentication system
- [ ] Challenge difficulty levels with filtering
- [ ] Time-based challenges
- [ ] Hint system with limited uses
- [ ] Achievement badges and trophies
- [ ] Challenge categories with advanced filtering
- [ ] Admin panel for challenge management
- [ ] Export/import challenge sets
- [ ] Multiplayer real-time competition
- [ ] Challenge submission system for community challenges
- [ ] Automated challenge validation
- [ ] Performance analytics and statistics

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- All database tables use Row Level Security (RLS)
- Flags are stored securely in the database
- User data is isolated per user
- Case-insensitive flag matching for better UX
- Input validation on all flag submissions

## License

MIT License - Feel free to use and modify for educational purposes.

## Support

For issues or questions, please check the challenge hints or review the challenge descriptions for guidance.
