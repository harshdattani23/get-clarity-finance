# Get Clarity Finance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🏆 Submission for the [Securities Market Hackathon at GFF 2025](https://uat.globalfintechfest.com/sebi-hackathon)

This project is a submission for the **Securities Market Hackathon**, powered by BSE, CDSL, KFINTECH, NSDL and SEBI.

**Problem Statement Addressed:** [Fraud Prevention](https://uat.globalfintechfest.com/sebi-hackathon) & [Enhancing Retail Investor Education and Engagement](https://uat.globalfintechfest.com/sebi-hackathon)

> Fraudsters employ a range of deceptive tactics... eroding trust in the securities market. At the same time, many retail investors lack the knowledge to navigate the market safely, making them vulnerable.

---

## Our Solution: A Two-Pillar Approach

**Get Clarity Finance** tackles the root causes of investor harm with a comprehensive, AI-powered platform built on two essential pillars: **Protection** and **Education**. We believe that the most effective way to prevent fraud is to combine powerful detection tools with a well-educated investor base.

## 🚀 Key Features & Hackathon Outcomes

### Pillar 1: Fraud Prevention & Protection

Our direct intervention tools are designed to meet the specific outcomes of the "Fraud Prevention" challenge:

- **🔍 AI Content Analyzer**: Fulfills the need for a tool that "**scans online platforms, identifies suspicious investment offers / videos / audios / documents**". Users can paste any suspicious content, and our AI will analyze it for signs of fraud, bias, or manipulation.

- **✅ Entity Verification**: Addresses the need to "**verify advisor credentials against a regulatory database**". Our system allows users to quickly check if a stockbroker or advisor is registered, helping to identify impersonators.

- **📊 Trending Threats Dashboard**: Our platform is built to identify and link suspicious stock tips to market activity, fulfilling the need for a "**solution that monitors social media platforms...and provides a dashboard for regulators.**"

### Pillar 2: Investor Education & Engagement

To address the "Enhancing Retail Investor Education" challenge, we provide a proactive defense against fraud:

- **📚 Interactive Learning Hub**: An "**interactive app that educates users on stock market basics**". Our structured curriculum uses engaging tutorials and real-world examples to build financial literacy from the ground up.

- **🌐 Multilingual Support**: Addresses the need for "**educative material in various vernacular languages**". The entire platform is built with localization in mind, making financial education accessible to a broader audience.

- **🧠 AI-Powered Q&A**: Fulfills the need for a tool that can "**summarise material available on other sites**". Our AI assistant can answer investor questions in simple terms, acting as a safe, educational alternative to unverified online advice.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15) with Turbopack
- **AI/ML**: [Google Gemini](https://ai.google/discover/gemini/) (LLM for content analysis and Q&A)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Lucide React](https://lucide.dev/) for icons
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Recharts](https://recharts.org/) for charts
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/harshdattani23/get-clarity-finance.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up your environment variables by creating a `.env.local` file.
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   GEMINI_API_KEY=your_google_ai_key
   ```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
