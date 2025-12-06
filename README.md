# 🔴 Technical BS Detector

> **Test your outreach against the engineer BS filter before you hit send**

A React-based tool that analyzes sales and outreach messages for technical credibility. Scores your message based on red flags (buzzwords, sales speak) and green flags (technical vocabulary, personalization).

---

## 🎯 What It Does

Paste any outreach message and get:

- **BS Score (0-100)** - Higher = more credible
- **Red Flags** - Generic sales language, buzzwords, premature CTAs
- **Green Flags** - Technical vocabulary, personal research, pain point language
- **Fix Suggestions** - How to rewrite flagged sections

---

## 🔴 Red Flags Detected

| Flag | Severity | Issue |
|------|----------|-------|
| Buzzword Bingo | High | Words like "synergy", "leverage", "paradigm" |
| Generic Value Prop | High | "We help", "We enable", "We empower" |
| Sales Template Language | Critical | "Hope this finds you well", "Reaching out" |
| Business Speak to Engineers | High | ROI, increase revenue, save money |
| Premature CTA | Medium | "Quick call", "demo", "free trial" |
| Product-First Pitch | Medium | "Our solution", "our platform" |
| Self-Promotion | Medium | "Best-in-class", "industry-leading" |

---

## 🟢 Green Flags Detected

| Flag | Boost | Signal |
|------|-------|--------|
| Technical Vocabulary | +15 | Kubernetes, Terraform, CI/CD, microservices |
| Personal Research | +20 | "Saw you", "noticed", "read your" |
| Pain Point Language | +15 | Friction, bottleneck, challenge |
| Pattern Recognition | +10 | "Usually means", "typically indicates" |
| System-Level Thinking | +15 | Architecture, infrastructure, stack |
| Low-Pressure Approach | +10 | "Not pitching", "no pressure" |

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/BasinLeon/bs-detector.git
cd bs-detector

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📊 Scoring Logic

- **Base Score:** 50
- **Red Flag Penalty:** -10 to -25 (based on severity)
- **Green Flag Boost:** +10 to +20
- **Length Penalty:** -10 if > 150 words
- **Brevity Bonus:** +10 if < 100 words with 2+ green flags

---

## 🧪 Example

**Bad Message:**
> "Hope this finds you well! I'm reaching out about our industry-leading solution that can increase your revenue..."

**Score:** 10/100 ❌

**Good Message:**
> "Saw you're hiring for a DevSecOps engineer. Usually that means you're hitting friction with compliance while trying to maintain deployment velocity..."

**Score:** 85/100 ✅

---

## 🔗 Links

- **Portfolio:** [basinleon.github.io](https://basinleon.github.io)
- **LinkedIn:** [linkedin.com/in/leonbasin](https://linkedin.com/in/leonbasin)
- **X:** [@basin_leon](https://x.com/basin_leon)

---

Built by **Leon Basin** | Revenue Architect & GTM Builder
