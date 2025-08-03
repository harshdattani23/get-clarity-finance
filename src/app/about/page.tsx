import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Get Clarity Finance</h1>
        <p className="text-lg text-gray-600 mb-6">
          Get Clarity Finance is an AI-powered tool designed to protect investors from financial fraud. Our mission is to provide a reliable and accessible way for users to analyze suspicious messages, links, and documents, helping them make smarter and safer investment decisions.
        </p>
        <p className="text-lg text-gray-600">
          This tool is not a financial advisor. Always do your own research (DYOR) and consult with a qualified professional before making any investment decisions.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
