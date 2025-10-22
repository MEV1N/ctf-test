export interface Challenge {
  id: string
  title: string
  category: string
  description: string
  points: number
  flag: string
  hints: string[]
  content?: string
}

export const CHALLENGES: Challenge[] = [
  {
    id: "web-1",
    title: "Hidden in Plain Sight",
    category: "Web Exploitation",
    description:
      "Navigate to the target page and inspect the HTML source code to find the hidden flag. Use the button below to visit the page, then right-click and select 'Inspect' or press F12 to open developer tools.",
    points: 50,
    flag: "flag{7h3_s0urc3_c0d3_n3v3r_l13s}",
    hints: ["Check the HTML comments in the target page", "Look for hidden elements in the page source"],
    content: "Visit the target page and inspect its source code to find the flag.",
  },
  {
    id: "crypto-1",
    title: "Caesar's Secret",
    category: "Cryptography",
    description: 'Decrypt this Caesar cipher (shifted by 3): "iodj{fdhvdu_flskhu_lv_hdvb}"',
    points: 75,
    flag: "flag{c4es4r_d3cr7pt3d}",
    hints: ["Try shifting the letters by different amounts", "A Caesar cipher shifts each letter by a fixed number"],
    content: "Encrypted: iodj{fdhvdu_flskhu_lv_hdvb}",
  },
  {
    id: "osint-1",
    title: "OSINT Investigation",
    category: "OSINT",
    description:
      "Extract information from this fake profile: Name: Alex Chen, Birth Year: 1998, Favorite Number: 42. Use this information to construct the flag.",
    points: 100,
    flag: "flag{m3t4d4t4_h4rv3st3d}",
    hints: ["Look for patterns in the profile data", "Consider how the numbers might be related"],
    content: "Profile: Alex Chen (Born 1998, Favorite Number: 42)",
  },
  {
    id: "stego-1",
    title: "Hidden Message",
    category: "Steganography",
    description:
      'A message is hidden in this image metadata. The hidden text is encoded in the image filename pattern.',
    points: 75,
    flag: "flag{h1dd3n_1n_p1x3ls}",
    hints: ["Check image metadata and filenames", "Steganography hides data within other data"],
    content: "Image metadata contains hidden information",
  },
  {
    id: "forensics-1",
    title: "File Forensics",
    category: "Forensics",
    description: 'Decode this Base64 encoded file content: "ZmlsZV9mb3JlbnNpY3NfZnVu"',
    points: 100,
    flag: "flag{b4s364_d3c0d3d_f1l3s}",
    hints: ["Use a Base64 decoder online", "Base64 is a common encoding method"],
    content: "Encoded: ZmlsZV9mb3JlbnNpY3NfZnVu",
  },
  {
    id: "misc-1",
    title: "Logic Puzzle",
    category: "Miscellaneous",
    description: 'What word becomes shorter when you add two letters to it?',
    points: 50,
    flag: "flag{l0g1c_puzzl3_m4st3r}",
    hints: ["Think about word length paradoxes", "The answer is a common English word"],
    content: "Riddle: What word becomes shorter when you add two letters to it?",
  },
  {
    id: "web-2",
    title: "SQL Injection Basics",
    category: "Web Exploitation",
    description:
      "A simple SQL injection challenge. The admin password is hidden in the database.",
    points: 100,
    flag: "flag{sql_1nj3ct10n_pwn3d}",
    hints: ["SQL injection exploits improper input validation", "Try using quotes and logical operators"],
    content: "Login form vulnerable to SQL injection",
  },
  {
    id: "crypto-2",
    title: "ROT13 Decoder",
    category: "Cryptography",
    description: 'Find the hidden ROT13 encoded message and decode it to get the flag.',
    points: 75,
    flag: "flag{r0t13_d3c1ph3r3d_5ucce54u11y}",
    hints: ["Search the origin - look in the source code"],
    content: "The encoded message is hidden somewhere in the source code. Use developer tools to find it.",
  },
  {
    id: "osint-2",
    title: "Email OSINT",
    category: "OSINT",
    description:
      "Find the flag hidden in this email: From: hacker@example.com, Subject: CTF Challenge",
    points: 100,
    flag: "flag{3m41l_1nt3ll1g3nc3}",
    hints: ["Examine all parts of the email carefully", "Email headers and content can contain clues"],
    content: "Email investigation required - analyze the communication",
  },
  {
    id: "misc-2",
    title: "Binary Code",
    category: "Miscellaneous",
    description:
      "Decode this binary: 01100110 01101100 01100001 01100111 01111011 01100010 00110001 01101110 00110100 01110010 01111001 01011111 01110100 00110000 01011111 00110100 01110011 01100011 00110001 00110001 01111101",
    points: 125,
    flag: "flag{b1n4ry_t0_4sc11}",
    hints: ["Convert binary to ASCII characters", "Each 8-bit sequence represents one character"],
    content:
      "Binary: 01100110 01101100 01100001 01100111 01111011 01100010 00110001 01101110 00110100 01110010 01111001 01011111 01110100 00110000 01011111 00110100 01110011 01100011 00110001 00110001 01111101",
  },
]
