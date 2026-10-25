# 🔐 IAMGPT — IAM AI Agent

> **Your free, personal AI assistant for Identity & Access Management — runs on laptop & mobile.**

![IAMGPT Banner](https://img.shields.io/badge/IAMGPT-IAM%20AI%20Agent-00C2E0?style=for-the-badge&logo=shield&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/Powered%20by-Groq%20AI-F55036?style=for-the-badge&logo=groq&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Free](https://img.shields.io/badge/Cost-100%25%20Free-brightgreen?style=for-the-badge)

---

## 🚀 What is IAMGPT?

**IAMGPT** is a no-code AI agent built specifically for **Identity and Access Management (IAM) professionals, students, and IT teams**. It helps you learn, automate, and troubleshoot IAM tasks through a simple chat interface — no programming required.

Powered by **Groq AI (Llama 3.3 70B)** — completely free, no credit card needed.

---

## ✨ Features

- 🔐 **Okta** — SSO setup, SAML troubleshooting, SCIM provisioning, JIT, MFA
- 🏗️ **Active Directory** — OU design, Kerberos, FSMO, GPO, LDAP, Users & Groups
- 🛡️ **Microsoft Entra ID** — PIM, Conditional Access, Hybrid Identity, App Registrations
- ⛵ **SailPoint ISC** — Certifications, Role Mining, Access Requests, Governance
- 🚫 **Zero Trust & IAM Concepts** — RBAC, ABAC, SCIM, OAuth 2.0, OIDC, PAM
- 💼 **Career & Interview Prep** — IAM interview Q&A for TCS, Wipro, Infosys, HCL
- ✅ **Access Review Checklists** — Quarterly review templates, audit guidance
- 📱 **Mobile Friendly** — Access from any device on same Wi-Fi network

---

## 🖥️ Screenshots

```
╔══════════════════════════════════════════════╗
║   IAMGPT Agent (Groq FREE) is RUNNING! 🚀   ║
╠══════════════════════════════════════════════╣
║  💻  Laptop  →  http://localhost:3000        ║
║  📱  Mobile  →  http://192.168.x.x:3000     ║
╚══════════════════════════════════════════════╝
```

---

## ⚡ Quick Start

### Prerequisites
- [Node.js LTS](https://nodejs.org) installed
- Free [Groq API Key](https://console.groq.com) (sign in with Google)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/girish-m-vyas/iamgpt-agent.git
cd iamgpt-agent

# 2. Install dependencies
npm install

# 3. Add your API key
# Open .env file and add your Groq API key:
# GROQ_API_KEY=gsk_your_key_here

# 4. Start the agent
npm start
```

### Open in Browser
- **Laptop** → http://localhost:3000
- **Mobile** → http://YOUR_LOCAL_IP:3000 *(shown in terminal, same Wi-Fi)*

---

## 🔑 Getting Your Free Groq API Key

1. Go to **[console.groq.com](https://console.groq.com)**
2. Sign in with your Google account
3. Click **API Keys** → **Create API Key**
4. Copy the key and paste it in your `.env` file

```env
GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📁 Project Structure

```
iamgpt-agent/
├── server.js          # Express server + Groq API integration
├── package.json       # Node.js dependencies
├── .env               # API key (never commit this!)
├── .gitignore         # Excludes .env and node_modules
└── public/
    └── index.html     # Full frontend UI (HTML/CSS/JS)
```

---

## 🆓 Free Tier Limits (Groq)

| Metric | Limit |
|--------|-------|
| Requests per minute | 30 |
| Requests per day | 14,400 |
| Tokens per minute | 6,000 |
| Cost | **₹0 — Completely Free** |

---

## 🌐 Deploy to Cloud (Free)

Deploy on **[Render.com](https://render.com)** to get a public URL:

1. Push code to GitHub
2. Go to Render → New Web Service → Connect GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Add Environment Variable: `GROQ_API_KEY` = your key
6. Click **Deploy** → Get your public URL in 2-3 minutes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| AI Model | Llama 3.3 70B via Groq API |
| Frontend | Vanilla HTML/CSS/JavaScript |
| Design | Dark Navy + Cyan Terminal Theme |
| Deployment | Render.com (Free tier) |

---

## 💡 Example Prompts

```
"How do I set up SAML SSO in Okta for Salesforce?"
"Design an OU structure for a 10,000-user Indian IT company"
"Explain PIM in Microsoft Entra ID with a step-by-step guide"
"Give me 10 IAM interview questions asked at Wipro"
"Create a quarterly access review checklist for Active Directory"
"What is Zero Trust and how does Okta fit into it?"
```

---

## 👨‍💻 Author

**Girish Vyas**
Assistant Manager – IAM | RBL Bank

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/girish-m-vyas/)
[![Email](https://img.shields.io/badge/Email-gmvyas208%40gmail.com-D14836?style=flat&logo=gmail)](mailto:gmvyas208@gmail.com)

---

## 📄 License

MIT License — free to use, modify, and share.

---

## ⭐ Support

If this project helped you, please **give it a ⭐ on GitHub** — it helps others discover it!

> Built with ❤️ for the IAM community in India and beyond.
