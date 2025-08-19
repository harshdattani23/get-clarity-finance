"use client";

import { useState } from "react";
import LessonLayout from "../LessonLayout";
import MultiPartLesson from "@/components/stock-market-course/MultiPartLesson";
import InteractiveQuiz from "@/components/stock-market-course/InteractiveQuiz";
import InteractiveSelection from "@/components/stock-market-course/InteractiveSelection";
import ShortQuestions from "@/components/stock-market-course/ShortQuestions";
import AudioSummary from "@/components/stock-market-course/AudioSummary";
import ConfirmationCheck from "@/components/stock-market-course/ConfirmationCheck";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, PieChart, Layers, Target as TargetIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Minus, Plus } from 'lucide-react';

export default function RoleOfSebi() {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleLessonComplete = (totalScore: number) => {
    setFinalScore(totalScore);
    setLessonCompleted(true);
  };

  const handlePartComplete = (partId: string, score: number) => {
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  const createCompletionHandler = (partId: string) => {
    return (score: number, total?: number) => {
      const scaledScore = total ? Math.round((score / total) * 100) : score;
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partId, scaledScore);
      }
    };
  };

  const createConfirmationHandler = (partId: string) => {
    return (partIdParam: string, score: number) => {
      if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
        (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partIdParam, score);
      }
    };
  };

  const lessonParts = [
    {
      id: "introduction-with-audio",
      title: "Understanding SEBI&apos;s Role",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              What You&apos;ll Learn
            </h3>
            <p className="text-blue-700">
              In this lesson, you&apos;ll meet the watchdog of the Indian stock market: the Securities and Exchange Board of India (SEBI).
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Regulation Matters
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The stock market isn&apos;t a free-for-all. It is a highly regulated environment, and the chief regulator in India is <strong>SEBI (Securities and Exchange Board of India)</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              SEBI ensures that the market operates fairly, transparently, and efficiently, protecting investors and maintaining market integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• What SEBI is and its role</li>
                <li>• SEBI&apos;s primary mandate</li>
                <li>• How SEBI protects investors</li>
                <li>• SEBI&apos;s regulatory framework</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Investor protection</li>
                <li>• Market fairness</li>
                <li>• Regulatory compliance</li>
                <li>• Market confidence</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              🎧 Listen to the Multi-Language Audio Summary
            </h3>
            <p className="text-purple-700 mb-6">
              Take a moment to listen to this comprehensive audio summary available in multiple languages including Hindi, English, Bengali, Marathi, Gujarati, and Tamil.
            </p>
            
            <AudioSummary
              title="Role of SEBI - Audio Summary"
              description="Listen to a comprehensive audio summary of SEBI's role in the Indian stock market, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/role-of-sebi-ta.m4a"
              hindiTranscript="सेबी की भूमिका - भारतीय शेयर बाजार के नियामक की जिम्मेदारियां।"
              englishTranscript="Role of SEBI - Understanding the responsibilities of India's market regulator."
              bengaliTranscript="সেবির ভূমিকা - ভারতীয় শেয়ার বাজারের নিয়ন্ত্রকের দায়িত্ব।"
              marathiTranscript="सेबीची भूमिका - भारतीय शेअर बाजाराच्या नियामकाची जबाबदारी।"
              gujaratiTranscript="સેબીની ભૂમિકા - ભારતીય શેર બજારના નિયામકની જવાબદારીઓ।"
              tamilTranscript="செபியின் பங்கு - இந்திய பங்கு சந்தையின் ஒழுங்குமுறை அதிகாரியின் பொறுப்புகள்."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that SEBI is India's main stock market regulator",
              "I recognize that regulation ensures market fairness and investor protection"
            ]}
            partId="introduction-with-audio"
            onPartComplete={createConfirmationHandler("introduction-with-audio")}
          />
        </motion.div>
      ),
      isRequired: true,
      type: 'interactive' as const,
      skipAllowed: false
    },
    {
      id: "sebi-mandate",
      title: "SEBI&apos;s Primary Mandate",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🛡️ SEBI&apos;s Core Mission
            </h3>
            <p className="text-green-700 leading-relaxed">
              SEBI has three primary objectives that guide all its regulatory activities and ensure the Indian securities market operates with integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Protecting Investors</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ensuring the market is fair and investors are not cheated. SEBI implements strict regulations to prevent fraud, insider trading, and market manipulation.
              </p>
              <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-xs">
                <strong>Key Areas:</strong> Fraud prevention, disclosure requirements, grievance redressal
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Developing the Market</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Promoting the growth and health of the securities market. SEBI introduces new products, improves market infrastructure, and encourages innovation.
              </p>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                <strong>Key Areas:</strong> New products, market infrastructure, innovation
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Regulating Intermediaries</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Overseeing the conduct of brokers, exchanges, and other players. SEBI ensures all market participants follow ethical practices and comply with regulations.
              </p>
              <div className="mt-3 p-2 bg-purple-100 rounded text-purple-800 text-xs">
                <strong>Key Areas:</strong> Broker regulation, exchange oversight, compliance monitoring
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">How These Mandates Work Together</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Protection + Development:</h5>
                <p className="text-yellow-700 text-sm">
                  By protecting investors, SEBI builds confidence, which attracts more participants and helps develop the market.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Regulation + Growth:</h5>
                <p className="text-yellow-700 text-sm">
                  Proper regulation creates a level playing field, encouraging healthy competition and sustainable market growth.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "investor-protection",
      title: "How SEBI Protects Investors",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🛡️ Comprehensive Investor Protection Framework
            </h3>
            <p className="text-blue-700 leading-relaxed">
              SEBI employs multiple layers of protection to ensure investors can participate in the market with confidence and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Disclosure Requirements</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Company Disclosures:</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Financial statements</li>
                    <li>• Material events</li>
                    <li>• Corporate governance</li>
                    <li>• Risk factors</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Market Disclosures:</h5>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Trading volumes</li>
                    <li>• Price movements</li>
                    <li>• Market depth</li>
                    <li>• Regulatory actions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Fraud Prevention</h4>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <h5 className="font-medium text-red-800 mb-1">Insider Trading Prevention:</h5>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Trading restrictions</li>
                    <li>• Disclosure requirements</li>
                    <li>• Monitoring systems</li>
                    <li>• Penalties</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <h5 className="font-medium text-orange-800 mb-1">Market Manipulation:</h5>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Price rigging detection</li>
                    <li>• Volume manipulation</li>
                    <li>• False rumors</li>
                    <li>• Pump and dump schemes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Grievance Redressal System</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">SEBI Complaints:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Online complaint portal</li>
                  <li>• Dedicated helpline</li>
                  <li>• Email support</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Resolution Process:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Acknowledgment</li>
                  <li>• Investigation</li>
                  <li>• Action taken</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Compensation:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Recovery proceedings</li>
                  <li>• Investor protection fund</li>
                  <li>• Legal recourse</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "quiz-1",
      title: "SEBI&apos;s Role Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "sebi-mandate",
              question: "What is SEBI&apos;s primary mandate?",
              options: [
                "To maximize profits for investors",
                "To protect investors, develop markets, and regulate intermediaries",
                "To control stock prices",
                "To collect taxes from traders"
              ],
              correctAnswer: 1,
              explanation: "Correct! SEBI's primary mandate is to protect investors, develop markets, and regulate intermediaries to ensure a fair and efficient securities market."
            },
            {
              id: "investor-protection",
              question: "How does SEBI protect investors?",
              options: [
                "By guaranteeing investment returns",
                "By ensuring market fairness and preventing fraud",
                "By buying stocks on behalf of investors",
                "By setting minimum stock prices"
              ],
              correctAnswer: 1,
              explanation: "Great! SEBI protects investors by ensuring market fairness, implementing disclosure requirements, preventing fraud, and maintaining a robust grievance redressal system."
            },
            {
              id: "market-regulation",
              question: "Why is market regulation important?",
              options: [
                "To increase government control over businesses",
                "To ensure fair, transparent, and efficient market operations",
                "To reduce market competition",
                "To limit investor participation"
              ],
              correctAnswer: 1,
              explanation: "Excellent! Market regulation is important because it ensures fair, transparent, and efficient market operations, which builds investor confidence and promotes healthy market growth."
            }
          ]}
          onComplete={createCompletionHandler("quiz-1")}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "regulatory-framework",
      title: "SEBI&apos;s Regulatory Framework",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🏗️ Building a Robust Regulatory System
            </h3>
            <p className="text-blue-700">
              SEBI has established a comprehensive regulatory framework that covers all aspects of the securities market to ensure transparency and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Market Participants Regulation</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Stock Exchanges:</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Trading rules</li>
                    <li>• Surveillance systems</li>
                    <li>• Risk management</li>
                    <li>• Technology standards</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Brokers & Dealers:</h5>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Registration requirements</li>
                    <li>• Capital adequacy</li>
                    <li>• Code of conduct</li>
                    <li>• Client protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Product Regulation</h4>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <h5 className="font-medium text-purple-800 mb-1">New Products:</h5>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Approval process</li>
                    <li>• Risk assessment</li>
                    <li>• Disclosure requirements</li>
                    <li>• Trading mechanisms</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <h5 className="font-medium text-orange-800 mb-1">Existing Products:</h5>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Regular monitoring</li>
                    <li>• Performance evaluation</li>
                    <li>• Rule updates</li>
                    <li>• Risk mitigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Enforcement Mechanisms</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Investigations:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Market surveillance</li>
                  <li>• Complaint analysis</li>
                  <li>• Forensic audits</li>
                  <li>• Expert consultations</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Penalties:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Monetary fines</li>
                  <li>• Trading suspensions</li>
                  <li>• Registration cancellations</li>
                  <li>• Criminal proceedings</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Prevention:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Early warning systems</li>
                  <li>• Risk alerts</li>
                  <li>• Education programs</li>
                  <li>• Best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: "selection-exercise",
      title: "Regulatory Framework Exercise",
      content: (
        <InteractiveSelection
          title="Match each regulatory aspect with its correct description"
          description="Select the correct description for each regulatory aspect. This will help you understand SEBI's comprehensive regulatory framework."
          options={[
            {
              id: "investor-protection",
              text: "SEBI protects investors through disclosure requirements, fraud prevention, and grievance redressal",
              isCorrect: true,
              explanation: "Correct! SEBI protects investors through comprehensive measures including mandatory disclosures, fraud prevention systems, and a robust grievance redressal mechanism."
            },
            {
              id: "market-development",
              text: "SEBI promotes market development by introducing new products and improving infrastructure",
              isCorrect: true,
              explanation: "Correct! SEBI actively promotes market development by approving new financial products, improving market infrastructure, and encouraging innovation."
            },
            {
              id: "intermediary-regulation",
              text: "SEBI regulates intermediaries to ensure ethical practices and compliance with rules",
              isCorrect: true,
              explanation: "Correct! SEBI oversees all market intermediaries including brokers, exchanges, and other participants to ensure they follow ethical practices and comply with regulations."
            }
          ]}
          onComplete={createCompletionHandler("selection-exercise")}
        />
      ),
      isRequired: true,
      type: 'selection' as const,
      minScore: 50,
      skipAllowed: false
    },
    {
      id: "short-questions",
      title: "Understanding Check",
      content: (
        <ShortQuestions
          title="Test Your Understanding"
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about SEBI&apos;s role."
          questions={[
            {
              id: "sebi-importance",
              question: "Why is SEBI important for the Indian stock market?",
              hint: "Think about investor protection, market fairness, and regulatory oversight.",
              correctAnswer: "investor protection market fairness regulatory oversight market confidence transparency efficiency",
              explanation: "Great! SEBI is important because it protects investors, ensures market fairness, provides regulatory oversight, builds market confidence, and maintains transparency and efficiency in the securities market."
            },
            {
              id: "protection-mechanisms",
              question: "What are the main ways SEBI protects investors?",
              hint: "Consider disclosure requirements, fraud prevention, and grievance redressal.",
              correctAnswer: "disclosure requirements fraud prevention insider trading prevention market manipulation detection grievance redressal",
              explanation: "Perfect! SEBI protects investors through mandatory disclosure requirements, fraud prevention measures (including insider trading and market manipulation detection), and a comprehensive grievance redressal system."
            },
            {
              id: "regulatory-balance",
              question: "How does SEBI balance regulation with market development?",
              hint: "Think about the relationship between investor protection and market growth.",
              correctAnswer: "protect investors build confidence attract participants develop market innovation infrastructure",
              explanation: "Excellent! SEBI balances regulation with market development by protecting investors, which builds confidence and attracts more participants. This enables market development through innovation and improved infrastructure while maintaining regulatory standards."
            }
          ]}
          onComplete={createCompletionHandler("short-questions")}
        />
      ),
      isRequired: true,
      type: 'short-answer' as const,
      minScore: 0,
      skipAllowed: false
    },
    {
      id: "key-takeaways",
      title: "Key Takeaways",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🎯 What You&apos;ve Learned
            </h3>
            <p className="text-green-700">
              Congratulations! You&apos;ve completed the &quot;Role of SEBI&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">SEBI&apos;s Role</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>SEBI is India&apos;s main securities market regulator</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Three primary mandates: protect, develop, regulate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Ensures market fairness and transparency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Comprehensive regulatory framework</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Investor Protection</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Mandatory disclosure requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Fraud prevention systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Grievance redressal mechanism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Market surveillance and enforcement</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Next Steps</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Learn More</h5>
                <p className="text-yellow-700 text-sm">Continue with next lessons</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Practice</h5>
                <p className="text-yellow-700 text-sm">Understand regulatory compliance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Study SEBI regulations</p>
              </div>
            </div>
          </div>
        </motion.div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    }
  ];

  if (lessonCompleted) {
    return (
      <LessonLayout
        title="Lesson Completed!"
        description="Congratulations on completing the &apos;Role of SEBI&apos; lesson"
        lessonSlug="role-of-sebi"
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Trophy className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Lesson Completed Successfully!
          </h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Performance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{finalScore}/{lessonParts.length * 100}</div>
                <div className="text-gray-600">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((finalScore / (lessonParts.length * 100)) * 100)}%
                </div>
                <div className="text-gray-600">Overall Performance</div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            You&apos;ve successfully learned about SEBI&apos;s role and demonstrated 
            your understanding through various interactive exercises. You&apos;re now 
            ready to continue with the next module!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setLessonCompleted(false)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review Lesson
            </button>
            <a
              href="/stock-market-course"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Course Overview
            </a>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title="The Role of SEBI"
      description="Meet the watchdog of the Indian stock market: the Securities and Exchange Board of India."
      lessonSlug="role-of-sebi"
    >
      <MultiPartLesson
        parts={lessonParts}
        onComplete={handleLessonComplete}
        onPartComplete={handlePartComplete}
        onPartCompleteDirect={handlePartComplete}
      />
    </LessonLayout>
  );
}
