"use client";

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Phone,
  Mail,
  Globe,
  Sparkles,
  TrendingUp,
  IndianRupee,
  Shield,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScamScenario {
  id: string;
  type: 'message' | 'email' | 'call' | 'website';
  title: string;
  content: string;
  redFlags: string[];
  isScam: boolean;
  explanation: string;
  tips: string[];
}

export default function FraudSimulator() {
  const [currentScenario, setCurrentScenario] = useState<ScamScenario | null>(null);
  const [userChoice, setUserChoice] = useState<'safe' | 'scam' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const scenarios: ScamScenario[] = [
    {
      id: '1',
      type: 'message',
      title: 'WhatsApp Stock Tip',
      content: "🚀 BREAKING! Our AI system detected RELIANCE will jump 40% tomorrow! Join our premium group for guaranteed profits. Only 50 seats left! Pay ₹5,000 now: +91-XXXXXXXXXX",
      redFlags: [
        "Guaranteed profits claim",
        "Urgency tactics (Only 50 seats)",
        "Asking for upfront payment",
        "Unofficial channel (WhatsApp)"
      ],
      isScam: true,
      explanation: "This is a classic pump-and-dump scam. No legitimate advisor guarantees profits or creates artificial urgency.",
      tips: [
        "SEBI-registered advisors never guarantee returns",
        "Be wary of 'limited time' offers",
        "Verify advisor registration on SEBI website"
      ]
    },
    {
      id: '2',
      type: 'email',
      title: 'SEBI Official Notice',
      content: "Dear Investor,\n\nYour trading account has been flagged for suspicious activity. Click here immediately to verify your identity and avoid account suspension.\n\nRegards,\nSEBI Compliance Team\n\n[Verify Now Button]",
      redFlags: [
        "Creates panic about account suspension",
        "Generic greeting (Dear Investor)",
        "Asks to click unverified link",
        "No official SEBI reference number"
      ],
      isScam: true,
      explanation: "This is a phishing email. SEBI never sends such urgent emails asking for verification through links.",
      tips: [
        "SEBI communicates through official channels",
        "Always verify sender's email domain",
        "Never click links in suspicious emails"
      ]
    },
    {
      id: '3',
      type: 'website',
      title: 'Investment Platform Ad',
      content: "NSE/BSE Registered Platform\n\n✓ Start with just ₹500\n✓ Average returns: 15-20% monthly\n✓ AI-powered trading\n✓ 10,000+ satisfied customers\n✓ Money-back guarantee\n\n[Sign Up for Free Trial]",
      redFlags: [
        "Unrealistic monthly returns (15-20%)",
        "Money-back guarantee on investments",
        "Vague registration claims"
      ],
      isScam: true,
      explanation: "No legitimate platform guarantees 15-20% monthly returns. This is likely a Ponzi scheme.",
      tips: [
        "Market returns are never guaranteed",
        "Verify NSE/BSE registration independently",
        "Be skeptical of consistent high returns"
      ]
    },
    {
      id: '4',
      type: 'call',
      title: 'Phone Call Script',
      content: "\"Hello Sir, I'm calling from ABC Securities, a SEBI-registered broker. We noticed you haven't activated your free demat account that comes with your PAN card. Would you like to know about our current offers on equity investments?\"",
      redFlags: [
        "Claims free demat with PAN card",
        "Cold calling about investments",
        "Pressure to activate immediately"
      ],
      isScam: true,
      explanation: "Demat accounts are never automatically linked to PAN cards. This is a social engineering attempt.",
      tips: [
        "Demat accounts require KYC and documentation",
        "SEBI-registered brokers don't cold call",
        "Never share personal details on unsolicited calls"
      ]
    },
    {
      id: '5',
      type: 'message',
      title: 'Telegram Channel Message',
      content: "HDFC Bank official announcement:\n\nDue to RBI's new guidelines, all shareholders must update their KYC by tonight 11:59 PM. Click here to update: hdfc-update.claims\n\nIgnoring will result in dividend forfeiture.",
      redFlags: [
        "Fake domain (hdfc-update.claims)",
        "Extreme urgency (by tonight)",
        "Threatens dividend loss",
        "Unofficial channel (Telegram)"
      ],
      isScam: true,
      explanation: "Companies never announce KYC updates through Telegram with such urgency. The domain is fake.",
      tips: [
        "Check official company websites for announcements",
        "Verify domain names carefully",
        "KYC updates have reasonable timelines"
      ]
    },
    {
      id: '6',
      type: 'email',
      title: 'Mutual Fund Update',
      content: "Dear Customer,\n\nYour SIP in Axis Bluechip Fund for ₹5,000 has been successfully processed for this month. Current NAV: ₹45.23\n\nFund Performance:\n- 1 Year: 12.5%\n- 3 Years: 11.2% CAGR\n\nFor details, login to your account.\n\nAxis Mutual Fund",
      redFlags: [],
      isScam: false,
      explanation: "This appears to be a legitimate transaction confirmation with realistic returns and proper information.",
      tips: [
        "Legitimate emails show realistic returns",
        "Contains specific transaction details",
        "Doesn't ask for sensitive information"
      ]
    }
  ];

  useEffect(() => {
    if (scenarios[scenarioIndex]) {
      setCurrentScenario(scenarios[scenarioIndex]);
      setUserChoice(null);
      setShowResult(false);
      setShowHints(false);
    }
  }, [scenarioIndex]);

  const handleChoice = (choice: 'safe' | 'scam') => {
    setUserChoice(choice);
    setShowResult(true);

    const isCorrect = 
      (choice === 'scam' && currentScenario?.isScam) || 
      (choice === 'safe' && !currentScenario?.isScam);

    if (isCorrect) {
      setScore(score + 10);
      setStreak(streak + 1);
      
      // Trigger confetti for correct answer
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
    }
  };

  const nextScenario = () => {
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'message': return <MessageSquare className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'call': return <Phone className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  if (!currentScenario) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Fraud Detection Simulator
          </h2>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-xs text-red-200">Score</p>
              <p className="text-xl font-bold">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-red-200">Streak</p>
              <p className="text-xl font-bold">🔥 {streak}</p>
            </div>
          </div>
        </div>
        <p className="text-red-100">
          Scenario {scenarioIndex + 1} of {scenarios.length}
        </p>
      </div>

      {/* Scenario Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gray-50 p-4 flex items-center gap-3 border-b">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            {getTypeIcon(currentScenario.type)}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">{currentScenario.type}</p>
            <h3 className="font-semibold text-gray-900">{currentScenario.title}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6 font-mono text-sm whitespace-pre-wrap">
            {currentScenario.content}
          </div>

          {!showResult && (
            <>
              {/* Hint Button */}
              <button
                onClick={() => setShowHints(!showHints)}
                className="mb-4 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                {showHints ? 'Hide Hints' : 'Need Hints?'}
              </button>

              {showHints && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-yellow-800 mb-2">Look for these signs:</p>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Guaranteed returns or profits?</li>
                    <li>• Urgency or time pressure?</li>
                    <li>• Asking for money upfront?</li>
                    <li>• Official looking but suspicious domain?</li>
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleChoice('safe')}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Looks Safe
                </button>
                <button
                  onClick={() => handleChoice('scam')}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  It's a Scam!
                </button>
              </div>
            </>
          )}

          {showResult && (
            <div className={`rounded-lg p-4 ${
              (userChoice === 'scam' && currentScenario.isScam) || 
              (userChoice === 'safe' && !currentScenario.isScam)
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {((userChoice === 'scam' && currentScenario.isScam) || 
                  (userChoice === 'safe' && !currentScenario.isScam)) ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Correct! +10 points</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">
                      Incorrect. This is {currentScenario.isScam ? 'a scam' : 'safe'}
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-700 mb-4">{currentScenario.explanation}</p>

              {currentScenario.isScam && currentScenario.redFlags.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Red Flags:</p>
                  <ul className="space-y-1">
                    {currentScenario.redFlags.map((flag, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <AlertTriangle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-xs font-semibold text-blue-800 mb-1">Remember:</p>
                <ul className="space-y-1">
                  {currentScenario.tips.map((tip, index) => (
                    <li key={index} className="text-xs text-blue-700">• {tip}</li>
                  ))}
                </ul>
              </div>

              {scenarioIndex < scenarios.length - 1 ? (
                <button
                  onClick={nextScenario}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Next Scenario
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    🎉 Simulation Complete!
                  </p>
                  <p className="text-gray-600">
                    Final Score: {score} points
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
