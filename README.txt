==================================================
  IAMGPT — IAM AI Agent (Powered by Groq)
  Model: openai/gpt-oss-20b
==================================================

WHAT YOU NEED
-------------
- Node.js (LTS recommended)
- Groq API key
- Laptop + Mobile on same Wi-Fi (only if using from mobile)

STEP 1 — Create a Groq API Key
------------------------------
1. Open the Groq Console in your browser.
2. Sign in and create a new API key.
3. Copy the key. Do not share it or commit it to Git.

IMPORTANT: If an API key was previously shared publicly or in a chat, revoke it and create a new one.

STEP 2 — Install Node.js
------------------------
Install the current Node.js LTS release, then verify in Command Prompt:

  node --version
  npm --version

STEP 3 — Put the Project on Your Desktop
----------------------------------------
Extract/copy the folder as:

  Desktop\iamgpt-groq

STEP 4 — Configure .env
-----------------------
Open .env and replace the placeholder with your NEW Groq API key:

  GROQ_API_KEY=your_new_groq_api_key_here

Optional port setting:

  PORT=3000

STEP 5 — Install and Start
--------------------------
Open Command Prompt and run:

  cd Desktop\iamgpt-groq
  npm install
  npm run check
  npm start

STEP 6 — Open in Browser
------------------------
Laptop:
  http://localhost:3000

Mobile:
  Use the local IP printed by the server, for example:
  http://192.168.x.x:3000

Your mobile and laptop must be on the same Wi-Fi. Your firewall may need to allow Node.js on the private network.

TO STOP THE SERVER
------------------
Press Ctrl + C in the terminal.

TO START AGAIN
--------------
  cd Desktop\iamgpt-groq
  npm start

TROUBLESHOOTING
---------------
- "GROQ_API_KEY not set": add the key to .env and restart.
- 401/invalid key: create a new Groq API key and update .env.
- Model error: this project uses openai/gpt-oss-20b.
- Mobile cannot connect: confirm same Wi-Fi and allow Node.js through Windows Firewall.

SECURITY
--------
- Never upload or share a .env file containing a real API key.
- Never commit .env to Git.
- Revoke exposed keys immediately.
