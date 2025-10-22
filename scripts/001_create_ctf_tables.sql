-- Create users table for CTF
CREATE TABLE IF NOT EXISTS public.ctf_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  total_points INTEGER DEFAULT 0,
  challenges_solved INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS public.ctf_challenges (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  points INTEGER NOT NULL,
  flag TEXT NOT NULL,
  hints TEXT[] NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create user_challenges table to track solved challenges
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.ctf_users(id) ON DELETE CASCADE,
  challenge_id TEXT NOT NULL REFERENCES public.ctf_challenges(id),
  solved_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE public.ctf_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ctf_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ctf_users
CREATE POLICY "Users can view all users" ON public.ctf_users FOR SELECT USING (true);
CREATE POLICY "Users can insert their own user record" ON public.ctf_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own record" ON public.ctf_users FOR UPDATE USING (true);

-- RLS Policies for ctf_challenges
CREATE POLICY "Everyone can view challenges" ON public.ctf_challenges FOR SELECT USING (true);

-- RLS Policies for user_challenges
CREATE POLICY "Users can view their own solved challenges" ON public.user_challenges FOR SELECT USING (true);
CREATE POLICY "Users can insert their own solved challenges" ON public.user_challenges FOR INSERT WITH CHECK (true);

-- Insert 10 challenges
INSERT INTO public.ctf_challenges (id, title, category, description, points, flag, hints, content) VALUES
('web-1', 'Hidden in Plain Sight', 'Web Exploitation', 'Navigate to the target page and inspect the HTML source code to find the hidden flag. Use the button below to visit the page, then right-click and select "Inspect" or press F12 to open developer tools.', 50, 'flag{7h3_s0urc3_c0d3_n3v3r_l13s_a9f2b8}', ARRAY['Check the HTML comments in the target page', 'Look for hidden elements in the page source'], 'Visit the target page and inspect its source code to find the flag.'),
('crypto-1', 'Caesar''s Secret', 'Cryptography', 'Decrypt this Caesar cipher (shifted by 3): "iodj{fdhvdu_flskhu_lv_hdvb}"', 75, 'flag{x9k2_c4es4r_d3cr7pt3d_8m1n}', ARRAY['Try shifting the letters by different amounts', 'A Caesar cipher shifts each letter by a fixed number'], 'Encrypted: iodj{fdhvdu_flskhu_lv_hdvb}'),
('osint-1', 'OSINT Investigation', 'OSINT', 'Extract information from this fake profile: Name: Alex Chen, Birth Year: 1998, Favorite Number: 42. Use this information to construct the flag.', 100, 'flag{m3t4d4t4_h4rv3st3d_7j9k3l}', ARRAY['Look for patterns in the profile data', 'Consider how the numbers might be related'], 'Profile: Alex Chen (Born 1998, Favorite Number: 42)'),
('stego-1', 'Hidden Message', 'Steganography', 'A message is hidden in this image metadata. The hidden text is encoded in the image filename pattern.', 75, 'flag{h1dd3n_1n_p1x3ls_q8w7e2}', ARRAY['Check image metadata and filenames', 'Steganography hides data within other data'], 'Image metadata contains hidden information'),
('forensics-1', 'File Forensics', 'Forensics', 'Decode this Base64 encoded file content: "ZmlsZV9mb3JlbnNpY3NfZnVu"', 100, 'flag{b4s364_d3c0d3d_f1l3s_p9o8i7}', ARRAY['Use a Base64 decoder online', 'Base64 is a common encoding method'], 'Encoded: ZmlsZV9mb3JlbnNpY3NfZnVu'),
('misc-1', 'Logic Puzzle', 'Miscellaneous', 'What word becomes shorter when you add two letters to it?', 50, 'flag{l0g1c_puzzl3_m4st3r_v5n4m1}', ARRAY['Think about word length paradoxes', 'The answer is a common English word'], 'Riddle: What word becomes shorter when you add two letters to it?'),
('web-2', 'SQL Injection Basics', 'Web Exploitation', 'A simple SQL injection challenge. The admin password is hidden in the database.', 100, 'flag{sql_1nj3ct10n_pwn3d_k8j7h6}', ARRAY['SQL injection exploits improper input validation', 'Try using quotes and logical operators'], 'Login form vulnerable to SQL injection'),
('crypto-2', 'ROT13 Decoder', 'Cryptography', 'Find the hidden ROT13 encoded message and decode it to get the flag.', 75, 'flag{r0t13_d3c1ph3r3d_z2x9c8}', ARRAY['ROT13 is a simple letter substitution cipher', 'Search the origin - look in the source code'], 'The encoded message is hidden somewhere in the source code. Use developer tools to find it.'),
('osint-2', 'Email OSINT', 'OSINT', 'Find the flag hidden in this email: From: hacker@example.com, Subject: CTF Challenge', 100, 'flag{3m41l_1nt3ll1g3nc3_u6t5r4}', ARRAY['Examine all parts of the email carefully', 'Email headers and content can contain clues'], 'Email investigation required - analyze the communication'),
('misc-2', 'Binary Code', 'Miscellaneous', 'Decode this binary: 01100110 01101100 01100001 01100111 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01111101', 125, 'flag{b1n4ry_t0_4sc11_m9n8b7}', ARRAY['Convert binary to ASCII characters', 'Each 8-bit sequence represents one character'], 'Binary: 01100110 01101100 01100001 01100111 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01111101');
