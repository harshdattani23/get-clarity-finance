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
import { Trophy, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, PieChart, Layers, Target as TargetIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Minus, Plus, CreditCard, Lock, ShoppingCart, Building2, FileText, CheckCircle2, UserCheck as UserCheckIcon, Shield, FileCheck } from 'lucide-react';

export default function TheKycProcess() {
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
      title: "Understanding the KYC Process",
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
              In this lesson, you&apos;ll understand the mandatory identity verification process required by all financial institutions to prevent fraud and ensure security.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What is KYC?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before you can open a Demat and Trading account, your broker needs to verify your identity. This is a mandatory regulatory requirement known as Know Your Customer, or KYC.
            </p>
            <p className="text-gray-700 leading-relaxed">
              It might seem like a bit of paperwork, but it&apos;s a crucial step for ensuring the security and integrity of the financial system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Key Concepts</h4>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• What KYC means and why it&apos;s required</li>
                <li>• The importance of identity verification</li>
                <li>• Documents needed for KYC</li>
                <li>• The KYC process steps</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Why It Matters</h4>
              <ul className="text-orange-700 space-y-1 text-sm">
                <li>• Regulatory compliance</li>
                <li>• Fraud prevention</li>
                <li>• Account security</li>
                <li>• Financial system integrity</li>
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
              title="The KYC Process - Audio Summary"
              description="Listen to a comprehensive audio summary of the KYC process, available in multiple languages."
              hindiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-hi.m4a"
              englishAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-en.m4a"
              bengaliAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-bn.m4a"
              marathiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-mr.m4a"
              gujaratiAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-gu.m4a"
              tamilAudioUrl="https://storage.googleapis.com/getclarity-audio-bucket/lessons/introduction/kyc-process-ta.m4a"
              hindiTranscript="केवाईसी प्रक्रिया - पहचान सत्यापन की अनिवार्य प्रक्रिया।"
              englishTranscript="The KYC Process - Mandatory identity verification process."
              bengaliTranscript="কেওয়াইসি প্রক্রিয়া - পরিচয় যাচাইকরণের বাধ্যতামূলক প্রক্রিয়া।"
              marathiTranscript="केवायसी प्रक्रिया - ओळख पडताळणीची बंधनकारक प्रक्रिया।"
              gujaratiTranscript="કેયાયસી પ્રક્રિયા - ઓળખ ચકાસણીની ફરજિયાત પ્રક્રિયા."
              tamilTranscript="கேஒய்சி செயல்முறை - அடையாள சரிபார்ப்பின் கட்டாய செயல்முறை."
            />
          </div>

          <ConfirmationCheck
            title="Ready to Continue?"
            description="Before moving to the next part, please confirm that you understand the basic concept:"
            checkboxes={[
              "I understand that KYC is a mandatory identity verification process",
              "I recognize that KYC is required before opening financial accounts"
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
      id: "kyc-importance",
      title: "Why is KYC Important?",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🛡️ The Three Pillars of KYC
            </h3>
            <p className="text-green-700 leading-relaxed">
              KYC serves three critical purposes that protect both individual investors and the entire financial system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Prevents Fraud</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                It ensures that all accounts are opened in the name of legitimate individuals, reducing the risk of identity theft and fraudulent account creation.
              </p>
              <div className="mt-3 p-2 bg-red-100 rounded text-red-800 text-xs">
                <strong>Benefit:</strong> Protects you from identity theft
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Combats Money Laundering</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                It helps authorities track the flow of money and prevent the financial system from being used for illegal purposes or money laundering activities.
              </p>
              <div className="mt-3 p-2 bg-blue-100 rounded text-blue-800 text-xs">
                <strong>Benefit:</strong> Maintains financial system integrity
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UserCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-3">Protects You</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                A verified identity ensures that only you can operate your account and access your investments, providing an additional layer of security.
              </p>
              <div className="mt-3 p-2 bg-green-100 rounded text-green-800 text-xs">
                <strong>Benefit:</strong> Ensures account security
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Additional Benefits</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Regulatory Compliance:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Meets SEBI requirements</li>
                  <li>• Follows RBI guidelines</li>
                  <li>• Complies with international standards</li>
                  <li>• Avoids legal penalties</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Market Confidence:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Builds investor trust</li>
                  <li>• Reduces market risks</li>
                  <li>• Promotes transparency</li>
                  <li>• Enhances market stability</li>
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
      id: "documents-required",
      title: "Documents Required for KYC",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              📋 Essential Documents for KYC Verification
            </h3>
            <p className="text-blue-700 leading-relaxed">
              The KYC process is now mostly online and very quick. You&apos;ll typically need to submit digital copies of standard documents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Proof of Identity</h4>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Primary Document:</h5>
                <p className="text-blue-700 text-sm mb-3">
                  Your <strong>PAN card</strong> is the primary document for proof of identity.
                </p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• PAN Card (mandatory)</li>
                  <li>• Aadhaar Card</li>
                  <li>• Passport</li>
                  <li>• Driving License</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Proof of Address</h4>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">Address Verification:</h5>
                <p className="text-green-700 text-sm mb-3">
                  Documents like Aadhaar Card, Passport, or a recent utility bill are accepted.
                </p>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Aadhaar Card</li>
                  <li>• Passport</li>
                  <li>• Utility Bills (electricity, gas, water)</li>
                  <li>• Bank Statement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Additional Requirements</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Photographs:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Recent passport-size photo</li>
                  <li>• Clear and recognizable</li>
                  <li>• Professional appearance</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Bank Details:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Bank account number</li>
                  <li>• IFSC code</li>
                  <li>• Bank statement</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Income Proof:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Salary slips</li>
                  <li>• IT returns</li>
                  <li>• Bank statements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Document Submission Tips</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Digital Format:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Clear, high-resolution scans</li>
                  <li>• PDF or JPEG format</li>
                  <li>• All pages visible</li>
                  <li>• No password protection</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Validity:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Documents not expired</li>
                  <li>• Recent utility bills (within 3 months)</li>
                  <li>• Current address information</li>
                  <li>• Matching details across documents</li>
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
      title: "KYC Process Quiz",
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: "kyc-definition",
              question: "What does KYC stand for and what is its purpose?",
              options: [
                "Know Your Company - to verify business details",
                "Know Your Customer - to verify customer identity",
                "Keep Your Cash - to protect money",
                "Know Your Currency - to verify currency types"
              ],
              correctAnswer: 1,
              explanation: "Correct! KYC stands for Know Your Customer and its purpose is to verify customer identity to prevent fraud and ensure security."
            },
            {
              id: "kyc-importance",
              question: "Why is KYC important for financial institutions?",
              options: [
                "To increase their profits",
                "To prevent fraud, combat money laundering, and protect customers",
                "To reduce customer service costs",
                "To speed up account opening"
              ],
              correctAnswer: 1,
              explanation: "Great! KYC is important because it prevents fraud, combats money laundering, and protects customers, ensuring the integrity of the financial system."
            },
            {
              id: "kyc-documents",
              question: "What is the primary document required for KYC identity verification?",
              options: [
                "Aadhaar Card",
                "PAN Card",
                "Passport",
                "Driving License"
              ],
              correctAnswer: 1,
              explanation: "Excellent! The PAN Card is the primary document required for KYC identity verification in India."
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
      id: "kyc-process-steps",
      title: "The KYC Process Steps",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">
              🔄 Step-by-Step KYC Process
            </h3>
            <p className="text-blue-700">
              Understanding the KYC process helps you prepare better and complete it quickly. Here&apos;s what to expect.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">Online KYC Process</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Account Registration</h5>
                  <p className="text-gray-700 text-sm">Visit the broker&apos;s website or app and start the account opening process</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Personal Information</h5>
                  <p className="text-gray-700 text-sm">Fill in your personal details, contact information, and financial background</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Document Upload</h5>
                  <p className="text-gray-700 text-sm">Upload scanned copies of required documents (PAN, Aadhaar, address proof)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Verification</h5>
                  <p className="text-gray-700 text-sm">Broker verifies your documents and information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 font-bold text-sm">5</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-1">Account Activation</h5>
                  <p className="text-gray-700 text-sm">Once verified, your account is activated and ready for trading</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-3">Processing Time</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Online KYC:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Usually completed within 24-48 hours</li>
                  <li>• Faster with complete documents</li>
                  <li>• Real-time status updates</li>
                  <li>• Email/SMS notifications</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-yellow-800 mb-2">Offline KYC:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• May take 3-5 business days</li>
                  <li>• Physical document verification</li>
                  <li>• In-person verification required</li>
                  <li>• Manual processing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Common Issues and Solutions</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Document Issues:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Ensure documents are not expired</li>
                  <li>• Upload clear, readable scans</li>
                  <li>• Match address across documents</li>
                  <li>• Include all required pages</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-blue-800 mb-2">Process Issues:</h5>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Complete all required fields</li>
                  <li>• Use valid contact information</li>
                  <li>• Follow up if delayed</li>
                  <li>• Keep reference numbers</li>
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
      title: "KYC Process Exercise",
      content: (
        <InteractiveSelection
          title="Match each KYC aspect with its correct description"
          description="Select the correct description for each KYC aspect. This will help you understand the complete KYC process."
          options={[
            {
              id: "kyc-purpose",
              text: "KYC is a mandatory identity verification process that prevents fraud and ensures account security",
              isCorrect: true,
              explanation: "Correct! KYC is a mandatory regulatory requirement that verifies customer identity to prevent fraud, combat money laundering, and ensure account security."
            },
            {
              id: "kyc-documents",
              text: "Required documents include PAN card for identity and Aadhaar/utility bills for address proof",
              isCorrect: true,
              explanation: "Correct! The primary documents required are PAN card for identity verification and Aadhaar card or utility bills for address proof."
            },
            {
              id: "kyc-process",
              text: "The KYC process involves registration, document upload, verification, and account activation",
              isCorrect: true,
              explanation: "Correct! The KYC process follows these steps: account registration, personal information input, document upload, verification, and finally account activation."
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
          description="Answer these questions to ensure you&apos;ve grasped the key concepts about the KYC process."
          questions={[
            {
              id: "kyc-importance",
              question: "Why is the KYC process important for both financial institutions and customers?",
              hint: "Think about fraud prevention, security, and regulatory compliance.",
              correctAnswer: "fraud prevention money laundering customer protection regulatory compliance account security financial system integrity",
              explanation: "Great! KYC is important because it prevents fraud, combats money laundering, protects customers, ensures regulatory compliance, provides account security, and maintains financial system integrity for both institutions and customers."
            },
            {
              id: "kyc-documents",
              question: "What documents are typically required for KYC and why are they necessary?",
              hint: "Consider identity verification and address confirmation.",
              correctAnswer: "pan card identity verification aadhaar address proof utility bills address confirmation recent documents validity",
              explanation: "Perfect! Required documents include: PAN card for identity verification, Aadhaar card or utility bills for address proof, and recent documents to ensure validity. These are necessary to verify your identity and confirm your address for security purposes."
            },
            {
              id: "kyc-process",
              question: "What are the main steps in the KYC process and how long does it typically take?",
              hint: "Think about the complete process from start to finish.",
              correctAnswer: "registration personal information document upload verification account activation 24-48 hours online 3-5 days offline",
              explanation: "Excellent! The main steps are: 1) Account registration, 2) Personal information input, 3) Document upload, 4) Verification, 5) Account activation. Online KYC typically takes 24-48 hours, while offline KYC may take 3-5 business days."
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
              Congratulations! You&apos;ve completed the &quot;The KYC Process&quot; lesson. 
              Here&apos;s a summary of the key concepts you now understand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">KYC Fundamentals</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>KYC is a mandatory identity verification process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Required before opening financial accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Prevents fraud and money laundering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Protects customers and institutions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-3">KYC Process</h4>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Online process is faster (24-48 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Requires PAN card and address proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Document verification and approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Account activation after verification</span>
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
                <p className="text-yellow-700 text-sm">Prepare KYC documents</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h5 className="font-medium text-yellow-800 mb-1">Research</h5>
                <p className="text-yellow-700 text-sm">Compare broker KYC processes</p>
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
        description="Congratulations on completing the &apos;The KYC Process&apos; lesson"
        lessonSlug="the-know-your-customer-kyc-process"
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
            You&apos;ve successfully learned about the KYC process and demonstrated 
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
      title="The Know Your Customer (KYC) Process"
      description="Understand the mandatory identity verification process required by all financial institutions to prevent fraud and ensure security."
      lessonSlug="the-know-your-customer-kyc-process"
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
