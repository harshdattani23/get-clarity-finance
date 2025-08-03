# SEBI Verify: Your Intelligent Investment Shield

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Welcome to **Get Clarity Finance**, an AI-powered platform designed to protect investors from securities fraud and misinformation. Our mission is to empower users with the tools and knowledge needed to make safe and informed investment decisions.

## 🚀 Key Features

- **🔍 AI Content Analyzer**: Paste any suspicious financial news, article, or social media post, and our AI will analyze it for signs of fraud, bias, or manipulation.
- **✅ Entity Verification**: Quickly check if a stockbroker, investment advisor, or other financial entity is registered with regulatory bodies. Our system cross-references a database of registered entities and a blacklist of known fraudulent actors.
- **📚 Investment Education**: Learn the fundamentals of safe investing through our structured, easy-to-follow curriculum. Build your financial literacy and confidence.
- **🌐 Multilingual Support**: The platform supports multiple languages to ensure accessibility for a diverse user base.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (v15) with Turbopack
- **Authentication**: [Clerk](https://clerk.com/)
- **AI/ML**: [Google Gemini](https://ai.google/discover/gemini/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: 
  - [Lucide React](https://lucide.dev/) for icons
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Recharts](https://recharts.org/) for charts
- **Internationalization (i18n)**: [i18next](https://www.i18next.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/your_project_name.git
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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your_username/your_project_name/issues).

---

Thank you for checking out Get Clarity Finance!
