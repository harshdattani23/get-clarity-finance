# Get Clarity Finance for GFF 2025 SEBI Hackathon

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Live Demo:** [**getclarity.finance**](https://getclarity.finance/)

---

### The Problem: Enhancing Retail Investor Education and Engagement

This project is an entry for the **[GFF 2025 SEBI Hackathon](https://www.globalfintechfest.com/sebi-hackathon)**, targeting the "Enhancing Retail Investor Education and Engagement" problem statement.

The Indian securities market is growing at an unprecedented rate, but this growth comes with significant risks. Millions of new retail investors are entering the market, but many lack the financial literacy to navigate it safely. This knowledge gap is exploited by fraudsters who use sophisticated tactics on social media and messaging apps to promote scams, spread misinformation, and manipulate stock prices. Furthermore, most educational resources are in English, leaving a large gap in vernacular languages. The result is significant financial loss for everyday investors and an erosion of trust in the market.

---

## Our Solution: An AI-Powered Shield for Investors

**Get Clarity Finance** is a comprehensive, AI-powered platform designed to empower and protect retail investors in India, directly addressing the hackathon's goals. Our mission is to level the playing field by providing accessible, multilingual tools and education that build a strong defense against fraud and foster informed decision-making.

We tackle the problem with a two-pillar approach: **Proactive Education** and **Instant Protection**. Our solution aims to be an interactive app that educates users on stock market basics, risk assessment techniques, and portfolio diversification through engaging tutorials, quizzes, and a virtual trading feature that tracks learning progress.

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

---
*Note: A small change to trigger deployment.*

---

## Market Data and Virtual Trading

- Virtual trading reads prices, changes, and volumes from the database via the API route `POST /api/stock-data`.
- The indices banner (NIFTY 50, SENSEX 30, BANK NIFTY, FINNIFTY) and the scrolling ticker also pull from the database.
- The UI is a simulated environment. Prices reflect the previous trading day’s close and are for illustration only. Orders and P&L are simulated. Nothing here is investment advice.

### Updating Prices into the Database

Use the Python updater in `python/update_prices.py` to fetch closing data and write to Cloud SQL.

Prereqs:
- Cloud SQL Proxy running locally (connects to your instance and exposes 127.0.0.1:5432)
- `DATABASE_URL` set for the app (same connection string used by Next.js)

Example (PowerShell):
```powershell
# Start Cloud SQL Proxy separately (example; adjust to your instance)
# .\cloud-sql-proxy.exe <INSTANCE_CONNECTION_NAME>=tcp:5432

# Set DB URL for this shell
$env:DATABASE_URL="postgresql://<user>:<pass>@127.0.0.1:5432/<database>"

# Run the updater
cd python
python update_prices.py
```

Notes:
- The updater fetches via Groww and writes to `Stock` (price, change, percentChange, volume, lastUpdatedAt).
- It detects index tickers and uses the appropriate exchange (e.g., `SENSEX` via BSE; `NIFTY`/`BANKNIFTY`/`FINNIFTY` via NSE) and retries across exchanges for symbols when needed.
- Market cap is not populated by the current API (returns `null`); volume and price are.

### Ensure Index Rows Exist

Create these rows once if they are missing, so banners can display values from DB:
```sql
INSERT INTO "Stock"(ticker, name, industry, "marketCap", indices)
VALUES
 ('NIFTY','NIFTY 50','Index','0',ARRAY['Index']),
 ('SENSEX','SENSEX 30','Index','0',ARRAY['Index']),
 ('BANKNIFTY','BANK NIFTY','Index','0',ARRAY['Index']),
 ('FINNIFTY','FINNIFTY','Index','0',ARRAY['Index'])
ON CONFLICT (ticker) DO NOTHING;
```

### API: Fetching Stock Data

- Endpoint: `POST /api/stock-data`
- Body: `{ "tickers": ["RELIANCE", "TCS"] }`
- Response: `[{ ticker, price, change, percentChange, volume, lastUpdatedAt }]`

The frontend uses a small hook to call this endpoint and render values without any real-time subscriptions.