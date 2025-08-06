# Get Clarity Finance

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Demo:** [**getclarity.finance**](https://getclarity.finance/)

---

### The Problem: A Minefield for Retail Investors

The Indian securities market is growing at an unprecedented rate, but this growth comes with significant risks. Millions of new retail investors are entering the market, but many lack the financial literacy to navigate it safely. This knowledge gap is exploited by fraudsters who use sophisticated tactics on social media and messaging apps to promote scams, spread misinformation, and manipulate stock prices. The result is significant financial loss for everyday investors and an erosion of trust in the market.

---

## Our Solution: An AI-Powered Shield for Investors

**Get Clarity Finance** is a comprehensive, AI-powered platform designed to empower and protect retail investors in India. Our mission is to level the playing field by providing accessible, multilingual tools and education that build a strong defense against fraud and foster informed decision-making.

We tackle the problem with a two-pillar approach: **Proactive Education** and **Instant Protection**.

## 🚀 Key Features

Our platform is a one-stop-shop for investor empowerment, built with the needs of the modern Indian retail investor in mind.

- **🧠 AI-Powered Content Analyzer**: Paste any suspicious message, news article, or social media post, and our AI will instantly analyze it for signs of fraud, bias, or manipulation. It also doubles as a financial expert, ready to answer any investment-related questions in simple, easy-to-understand language.

- **📚 Comprehensive Stock Market Course**: Our structured, multilingual curriculum covers everything from the absolute basics of "What is a Stock?" to advanced topics like fundamental and technical analysis. It's designed to build a strong foundation of financial literacy for investors at all levels.

- **🛡️ Investor Awareness Hub**: Stay informed and protected with our curated hub of resources on fraud prevention. Learn about the latest scams, understand SEBI regulations, and get practical tips to keep your investments safe.

- **📈 Virtual Trading Simulator**: Practice your trading strategies in a real-time, risk-free environment. Our simulator allows you to hone your skills and build confidence before investing real capital.

- **🌐 Multilingual Support**: The entire platform is available in multiple Indian languages, breaking down language barriers and making financial education accessible to everyone.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (v15) with Turbopack
-   **AI/ML**: [Google Gemini](https://ai.google/discover/gemini/) (LLM for content analysis and Q&A)
-   **Authentication**: [Clerk](https://clerk.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**:
    -   [Lucide React](https://lucide.dev/) for icons
    -   [Framer Motion](https://www.framer.com/motion/) for animations
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v20 or later)
-   npm, yarn, or your preferred package manager
-   A `.env.local` file with the required API keys (see below)

### Installation

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/harshdattani23/get-clarity-finance.git
    ```
2.  **Navigate to the Project Directory**
    ```sh
    cd get-clarity-finance
    ```
3.  **Install Dependencies**
    ```sh
    npm install
    ```
4.  **Set Up Environment Variables**

    Create a file named `.env.local` in the root of your project and add the following, replacing the placeholder values with your actual keys:

    ```env
    # Clerk Authentication Keys (get from clerk.com)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Google Gemini API Key (get from ai.google.dev)
    GEMINI_API_KEY=your_gemini_api_key
    GEMINI_MODEL_NAME=gemini-1.5-flash
    ```

### Running the Development Server

Once the installation is complete, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You're now ready to contribute!
