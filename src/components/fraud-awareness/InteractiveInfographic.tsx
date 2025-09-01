"use client";

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, Lock, Users, Repeat, Briefcase } from 'lucide-react';

interface InteractiveInfographicProps {
  fraudType: 'ponzi' | 'pump_dump' | 'insider_trading' | 'fake_advisors' | 'circular_trading' | 'front_running';
}

const fraudData = {
  ponzi: {
    icon: <TrendingDown className="w-12 h-12 text-red-500" />,
    title: "Ponzi Scheme",
    description: "Money from new investors is used to pay returns to earlier investors.",
  },
  pump_dump: {
    icon: <TrendingUp className="w-12 h-12 text-yellow-500" />,
    title: "Pump & Dump",
    description: "Artificially inflating a stock's price to sell it at a profit.",
  },
  insider_trading: {
    icon: <Lock className="w-12 h-12 text-purple-500" />,
    title: "Insider Trading",
    description: "Trading based on material, non-public information.",
  },
  fake_advisors: {
    icon: <Users className="w-12 h-12 text-blue-500" />,
    title: "Fake Advisors",
    description: "Unregistered individuals offering 'guaranteed returns'.",
  },
  circular_trading: {
    icon: <Repeat className="w-12 h-12 text-cyan-500" />,
    title: "Circular Trading",
    description: "Creating artificial trading volume to lure investors.",
  },
  front_running: {
    icon: <Briefcase className="w-12 h-12 text-indigo-500" />,
    title: "Front Running",
    description: "Brokers using advance knowledge of large client orders.",
  },
};

export default function InteractiveInfographic({ fraudType }: InteractiveInfographicProps) {
  const data = fraudData[fraudType];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-lg bg-white shadow-lg text-center"
    >
      <div className="flex justify-center mb-4">{data.icon}</div>
      <h3 className="text-xl font-bold mb-2">{data.title}</h3>
      <p className="text-gray-600">{data.description}</p>
    </motion.div>
  );
}
