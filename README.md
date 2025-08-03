# Get Clarity Finance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### 🏆 Submission for the [Securities Market Hackathon at GFF 2025](https://uat.globalfintechfest.com/sebi-hackathon)

This project is a submission for the **Securities Market Hackathon**, powered by BSE, CDSL, KFINTECH, NSDL and SEBI.

**Problem Statement:** [Fraud Prevention](https://uat.globalfintechfest.com/sebi-hackathon)

> Fraudsters employ a range of deceptive tactics to exploit or mislead investors... These activities cause financial losses to retail investors, erode their trust in the securities market and undermine market integrity.

---

## Our Solution

**Get Clarity Finance** is an AI-powered platform designed to directly address the "Fraud Prevention" challenge. We provide a tool that helps investors protect themselves by scanning online content, verifying advisor credentials, and flagging high-risk promotions before they can cause harm.

## 🚀 Key Features & Hackathon Outcomes

Our features are designed to meet the specific outcomes desired by the hackathon's "Fraud Prevention" problem statement:

- **🔍 AI Content Analyzer**: Fulfills the need for a tool that "**scans online platforms, identifies suspicious investment offers / videos / audios / documents**". Users can paste any suspicious financial news, article, or social media post, and our AI will analyze it for signs of fraud, bias, or manipulation.

- **✅ Entity Verification**: Addresses the need to "**verify advisor credentials against a regulatory database**". Our system allows users to quickly check if a stockbroker or investment advisor is a registered entity, helping to identify fraudulent advisors and impersonators.

- **📊 Trending Threats Dashboard**: Our platform is built to identify and link suspicious stock tips to market activity, fulfilling the need for a "**solution that monitors social media platforms...and provides a dashboard for regulators or exchanges to take action.**"

- **📚 Integrated Investor Education**: Aligned with SEBI’s mandate for investor protection, we provide a structured curriculum to build financial literacy and help users recognize and avoid common types of fraud.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack, chosen to meet the hackathon's evaluation criteria for the use of advanced technology:

- **Framework**: [Next.js](https://nextjs.org/) (v15) with Turbopack
- **AI/ML**: [Google Gemini](https://ai.google/discover/gemini/) (LLM for content analysis)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Lucide React](https://lucide.dev/) for icons
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Recharts](https://recharts.org/) for charts
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

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
3. Set up your environment variables by creating a `.env.local` file in the root directory. You will need to add your Clerk and Google AI API keys.
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   
   GEMINI_API_KEY=your_google_ai_key
   ```

### Running the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
