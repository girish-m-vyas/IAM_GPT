# IAMGPT Emergency Rate-Limit Fix

This build is intended to replace the currently deployed public demo.

Changes:
- Groq 429 errors are no longer exposed to visitors.
- Friendly "high demand" message is shown instead.
- Conversation context sent to Groq reduced to the last 6 messages.
- Maximum completion reduced from 1500 to 800 tokens.
- Per-IP public demo limit defaults to 20 requests/hour.
- Minimum gap between requests defaults to 4 seconds.
- Technical Groq errors remain in server logs only.

## Deploy
1. Replace the repository files with this build.
2. Keep your existing GROQ_API_KEY in Render Environment.
3. Optional Render variables:
   MAX_REQUESTS_PER_HOUR=20
   MIN_REQUEST_GAP_MS=4000
4. Commit and push to GitHub.
5. Let Render auto-deploy, or trigger a manual deploy.

Note: the in-memory public-demo limiter resets when Render restarts and is intended as lightweight protection. For stronger production controls, use a persistent rate-limit store.
