import LessonLayout from '../LessonLayout';

export default function WhatIsStockMarket() {
  const lessonTitle = "What is the Stock Market?";
  const lessonDescription = "Learn the basics of what a stock market is and how it functions in India.";
  
  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="what-is-stock-market">
      <h2>The Heart of Investment</h2>
      <p>
        The stock market, also known as the capital market, is where people and institutions trade financial securities. Think of it as a large, organized marketplace, but instead of goods, you&apos;re buying and selling small pieces of ownership in companies (stocks) or loans to corporations and governments (bonds).
      </p>
      
      <h3>Two Main Parts: Primary and Secondary Markets</h3>
      <p>
        The Indian Capital Market has two main components:
      </p>
      <ul>
        <li>
          <strong>The Primary Market:</strong> This is where new stocks and bonds are sold for the very first time. When a company wants to raise money from the public, it issues shares through an Initial Public Offering (IPO). This is the primary market in action.
        </li>
        <li>
          <strong>The Secondary Market:</strong> This is what most people think of as the &quot;stock market.&quot; It&apos;s where investors buy and sell existing securities from each other. The main goal here is to provide liquidity, allowing you to sell your investments when you need to. The most well-known parts of the secondary market are the stock exchanges.
        </li>
      </ul>

      <h3>Major Stock Exchanges in India</h3>
      <p>
        In India, the majority of stock trading happens on two main exchanges:
      </p>
      <ul>
        <li><strong>National Stock Exchange (NSE):</strong> One of the largest and most advanced stock markets in India.</li>
        <li><strong>Bombay Stock Exchange (BSE):</strong> The oldest stock exchange in Asia, with a rich history.</li>
      </ul>
      <p>
        These exchanges provide the platform where buyers and sellers meet to trade stocks in a secure, transparent, and regulated environment.
      </p>
    </LessonLayout>
  );
}
