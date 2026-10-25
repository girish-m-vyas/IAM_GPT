require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3000;

// Public demo protection: limits accidental abuse without storing personal data.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = Number(process.env.MAX_REQUESTS_PER_HOUR || 20);
const MIN_REQUEST_GAP_MS = Number(process.env.MIN_REQUEST_GAP_MS || 4000);
const usage = new Map();

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return (forwarded ? forwarded.split(",")[0] : req.ip || "unknown").trim();
}

function checkPublicDemoLimit(req) {
  const key = getClientKey(req);
  const now = Date.now();
  let item = usage.get(key);
  if (!item || now - item.windowStart >= WINDOW_MS) {
    item = { windowStart: now, count: 0, lastRequest: 0 };
  }
  if (now - item.lastRequest < MIN_REQUEST_GAP_MS) {
    return { allowed: false, status: 429, retryAfter: Math.ceil((MIN_REQUEST_GAP_MS - (now - item.lastRequest))/1000),
      message: "Please wait a few seconds before sending another question." };
  }
  if (item.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, status: 429, retryAfter: Math.ceil((WINDOW_MS - (now - item.windowStart))/1000),
      message: "You’ve reached the IAMGPT public demo limit for this hour. Please try again later." };
  }
  item.count += 1;
  item.lastRequest = now;
  usage.set(key, item);
  return { allowed: true };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, item] of usage.entries()) {
    if (now - item.windowStart > WINDOW_MS * 2) usage.delete(key);
  }
}, WINDOW_MS).unref();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SYSTEM_PROMPT = `You are IAMGPT — an expert AI agent specializing in Identity and Access Management (IAM). You help IAM professionals, students, and IT teams automate, learn, and troubleshoot IAM tasks without writing code.

Your areas of deep expertise include:
- Active Directory (AD): Users, Groups, OUs, GPOs, Domain Controllers, FSMO Roles, Kerberos, LDAP, Replication, Trusts
- Microsoft Entra ID (Azure AD): Conditional Access, PIM, App Registrations, Hybrid Identity, Sync, SSPR
- Okta: Workforce Identity, SAML/OIDC SSO, MFA, Lifecycle Management, Group Rules, API Access Management, Okta Workflows, JIT Provisioning
- SailPoint IIQ / IdentityNow (ISC): Identity Governance, Certifications, Role Mining, Access Requests, Provisioning Policies
- IAM Concepts: Zero Trust, PAM/PIM, RBAC, ABAC, SCIM, OAuth 2.0, OpenID Connect, Identity Lifecycle, SoD, Access Reviews, Least Privilege
- Indian IT Context: Infosys, TCS, Wipro, HCL, Cognizant — how IAM is implemented in large Indian IT organizations

You can:
1. Explain IAM concepts clearly with real-world Indian IT examples
2. Help troubleshoot IAM issues (Okta SAML errors, AD sync issues, Entra ID Conditional Access problems)
3. Guide through step-by-step configurations (Okta-Salesforce SSO, AD OU design, SailPoint ISC setup)
4. Generate policy templates, access review checklists, onboarding/offboarding workflows in plain text
5. Create IAM interview Q&A and career guidance for IAM professionals
6. Help design IAM architectures, user lifecycle workflows, RBAC matrices
7. Explain audit and compliance concepts (SOX, ISO 27001 from an IAM lens)

Keep responses practical, concise, and relevant to real-world IAM operations. Use structured formatting with clear sections. When relevant, mention how things work in enterprise Indian IT environments.`;

// Chat endpoint — uses Groq API (Free, works in India)
app.post("/api/chat", async (req, res) => {
  const limit = checkPublicDemoLimit(req);
  if (!limit.allowed) {
    res.set("Retry-After", String(limit.retryAfter));
    return res.status(limit.status).json({ error: limit.message, code: "DEMO_RATE_LIMIT" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not set in .env file. Please add it." });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages must be a non-empty array." });
    }

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-6).map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || "").slice(0, 6000)
      }))
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: groqMessages,
        max_completion_tokens: 800,
        include_reasoning: false,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Groq API error:", response.status, data?.error?.message || data);

      if (response.status === 429) {
        const retryAfter = response.headers.get("retry-after");
        if (retryAfter) res.set("Retry-After", retryAfter);
        return res.status(429).json({
          code: "AI_CAPACITY",
          error: "IAMGPT is experiencing high demand right now. Please try again in a few minutes. Thanks for checking out IAMGPT! 🔐"
        });
      }

      return res.status(502).json({
        code: "AI_SERVICE_ERROR",
        error: "IAMGPT is temporarily unable to generate a response. Please try again shortly."
      });
    }

    const reply = data.choices?.[0]?.message?.content || "No response received.";
    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

app.get("/api/server-info", (req, res) => {
  const interfaces = os.networkInterfaces();
  let localIP = "localhost";
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
  }
  res.json({ localIP, port: PORT });
});

app.listen(PORT, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  let localIP = "your-laptop-ip";
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        localIP = iface.address;
        break;
      }
    }
  }
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║   IAMGPT Agent (Groq FREE) is RUNNING! 🚀   ║");
  console.log("╠══════════════════════════════════════════════╣");
  console.log(`║  💻  Laptop  →  http://localhost:${PORT}         ║`);
  console.log(`║  📱  Mobile  →  http://${localIP}:${PORT}    ║`);
  console.log("║  (Mobile must be on same Wi-Fi network)      ║");
  console.log("╚══════════════════════════════════════════════╝\n");
});
