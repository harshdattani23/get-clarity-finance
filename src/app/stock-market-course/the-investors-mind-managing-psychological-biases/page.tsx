"use client";

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';
import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';
import ConfirmationCheck from '@/components/stock-market-course/ConfirmationCheck';
import InteractiveQuiz from '@/components/stock-market-course/InteractiveQuiz';
import InteractiveSelection from '@/components/stock-market-course/InteractiveSelection';
import ShortQuestions from '@/components/stock-market-course/ShortQuestions';

export default function PsychologicalBiasesPage() {
  const { t } = useTranslation('stock-market-course.the-investors-mind-managing-psychological-biases');
  const [totalScore, setTotalScore] = useState(0);
  const [partScores, setPartScores] = useState<Record<string, number>>({});

  const handleComplete = (score: number) => {
    setTotalScore(score);
    console.log(`Lesson completed with total score: ${score}`);
  };

  const handlePartComplete = (partId: string, score: number) => {
    setPartScores(prev => ({ ...prev, [partId]: score }));
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  const lessonParts = [
    {
      id: 'introduction',
      title: 'Introduction to Psychological Biases',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <p className="text-red-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="The Investor's Mind: Managing Psychological Biases"
            description="The biggest enemy in investing is often not the market, but yourself. Learn to overcome common psychological biases."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Common psychological biases</li>
                <li>• Real-world examples</li>
                <li>• Strategies to overcome biases</li>
                <li>• Building emotional discipline</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Why It Matters</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Biases can cost you money</li>
                <li>• Emotional decisions often fail</li>
                <li>• Discipline leads to success</li>
                <li>• Self-awareness is key</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'psychological-biases',
      title: 'What Are Psychological Biases?',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">{t('section1_title') as string}</h3>
            <p className="text-blue-700 text-lg mb-4">{t('section1_p1') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Cognitive Biases</h4>
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-800" dangerouslySetInnerHTML={{ __html: t('section1_l1') as string }} />
                </div>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <p className="text-orange-800" dangerouslySetInnerHTML={{ __html: t('section1_l2') as string }} />
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-red-800" dangerouslySetInnerHTML={{ __html: t('section1_l3') as string }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Emotional Biases</h4>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-purple-800" dangerouslySetInnerHTML={{ __html: t('section1_l4') as string }} />
                </div>
                <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                  <p className="text-indigo-800" dangerouslySetInnerHTML={{ __html: t('section1_l5') as string }} />
                </div>
                <div className="bg-pink-50 p-3 rounded border border-pink-200">
                  <p className="text-pink-800" dangerouslySetInnerHTML={{ __html: t('section1_l6') as string }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">💡 Key Insight</h4>
            <p className="text-green-700">
              These biases operate on a subconscious level, making them particularly dangerous. The first step to overcoming them 
              is recognizing when they're influencing your decisions.
            </p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'biases-quiz',
      title: 'Psychological Biases Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'biases-q1',
              question: "Which bias involves seeking information that confirms your existing beliefs?",
              options: [
                "Overconfidence bias",
                "Confirmation bias",
                "Herding mentality",
                "Loss aversion"
              ],
              correctAnswer: 1,
              explanation: "Confirmation bias is the tendency to search for, interpret, and favor information that confirms your existing beliefs."
            },
            {
              id: 'biases-q2',
              question: "What is the main characteristic of loss aversion?",
              options: [
                "Overestimating your abilities",
                "Following the crowd",
                "Feeling losses more intensely than gains",
                "Relying on first impressions"
              ],
              correctAnswer: 2,
              explanation: "Loss aversion means feeling the pain of a loss more intensely than the pleasure of an equal gain."
            },
            {
              id: 'biases-q3',
              question: "Which bias involves relying too heavily on the first piece of information received?",
              options: [
                "Recency bias",
                "Anchoring bias",
                "Overconfidence bias",
                "Herding mentality"
              ],
              correctAnswer: 1,
              explanation: "Anchoring bias is the tendency to rely too heavily on the first piece of information offered when making decisions."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('biases-quiz', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 70,
      skipAllowed: false
    },
    {
      id: 'real-world-scenarios',
      title: 'Common Biases in Action: Real-World Scenarios',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Real-World Examples</h3>
            <p className="text-green-700 text-lg mb-4">See how these biases manifest in actual investment scenarios</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Confirmation Bias: 'This Stock HAS to Go Up!'</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section2.1_p1') as string }} />
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-red-700 text-sm"><strong>Result:</strong> You ignore warning signs and hold onto a losing position</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Overconfidence: 'I Know How to Pick Winners.'</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section2.2_p1') as string }} />
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <p className="text-orange-700 text-sm"><strong>Result:</strong> Increased risk-taking leads to significant losses</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Herding: 'Everyone is Buying It, So It Must Be Good.'</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section2.3_p1') as string }} />
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-700 text-sm"><strong>Result:</strong> Buying at the peak, just before the bubble bursts</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Loss Aversion: 'I'll Sell It as Soon as I Break Even.'</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section2.4_p1') as string }} />
                <div className="bg-purple-50 p-3 rounded border border-purple-200">
                  <p className="text-purple-700 text-sm"><strong>Result:</strong> Holding declining assets, tying up capital</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Anchoring: 'It Was ₹500, So It's a Bargain at ₹300.'</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section2.5_p1') as string }} />
                <div className="bg-indigo-50 p-3 rounded border border-indigo-200">
                  <p className="text-indigo-700 text-sm"><strong>Result:</strong> Ignoring fundamental changes, buying overvalued stocks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'scenarios-quiz',
      title: 'Real-World Scenarios Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'scenarios-q1',
              question: "What typically happens when you succumb to herding mentality?",
              options: [
                "You make well-researched decisions",
                "You buy at the peak of market hype",
                "You avoid market bubbles",
                "You outperform the market"
              ],
              correctAnswer: 1,
              explanation: "Herding mentality often leads to buying at the peak of market hype, just before the bubble bursts."
            },
            {
              id: 'scenarios-q2',
              question: "Why is loss aversion particularly dangerous for investors?",
              options: [
                "It makes you too cautious",
                "It causes you to hold losing positions too long",
                "It prevents you from taking risks",
                "It makes you too aggressive"
              ],
              correctAnswer: 1,
              explanation: "Loss aversion causes investors to hold losing positions too long, hoping to break even, which can lead to bigger losses."
            },
            {
              id: 'scenarios-q3',
              question: "What is the main problem with anchoring bias?",
              options: [
                "It makes you too emotional",
                "It prevents you from seeing current reality",
                "It makes you too confident",
                "It causes you to follow the crowd"
              ],
              correctAnswer: 1,
              explanation: "Anchoring bias prevents you from seeing current reality by making you rely too heavily on past information."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('scenarios-quiz', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 70,
      skipAllowed: false
    },
    {
      id: 'overcoming-biases',
      title: 'Strategies to Overcome Biases',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{t('section3_title') as string}</h3>
            <p className="text-purple-700 text-lg mb-4">Practical strategies to build emotional discipline and overcome psychological biases</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Planning & Structure</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-blue-800" dangerouslySetInnerHTML={{ __html: t('section3_l1') as string }} />
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-green-800" dangerouslySetInnerHTML={{ __html: t('section3_l2') as string }} />
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-800" dangerouslySetInnerHTML={{ __html: t('section3_l3') as string }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Risk Management</h4>
              <div className="space-y-3">
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <p className="text-orange-800" dangerouslySetInnerHTML={{ __html: t('section3_l4') as string }} />
                </div>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-red-800" dangerouslySetInnerHTML={{ __html: t('section3_l5') as string }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-indigo-800 mb-3">Implementation Checklist</h4>
            <div className="grid md:grid-cols-2 gap-4 text-indigo-700">
              <div>
                <p className="font-semibold">This Week:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Write down your investment plan</li>
                  <li>Set up automatic investments</li>
                  <li>Start an investment journal</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">This Month:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Review and diversify portfolio</li>
                  <li>Set stop-loss orders</li>
                  <li>Review your investment journal</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'bias-matching',
      title: 'Bias Recognition Exercise',
      content: (
        <InteractiveSelection
          title="Match Investment Scenarios with Their Psychological Biases"
          description="Identify which psychological bias is most likely affecting each investment decision"
          options={[
            { 
              id: 'confirmation', 
              text: 'Only reading positive news about a stock you own', 
              isCorrect: true, 
              explanation: 'This is confirmation bias - seeking information that confirms your existing beliefs' 
            },
            { 
              id: 'overconfidence', 
              text: 'Trading more frequently after a few wins', 
              isCorrect: true, 
              explanation: 'This is overconfidence bias - overestimating your abilities based on recent success' 
            },
            { 
              id: 'herding', 
              text: 'Buying a stock because everyone else is buying it', 
              isCorrect: true, 
              explanation: 'This is herding mentality - following the crowd without independent analysis' 
            },
            { 
              id: 'loss-aversion', 
              text: 'Holding a losing stock hoping to break even', 
              isCorrect: true, 
              explanation: 'This is loss aversion - avoiding the pain of realizing a loss' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('bias-matching', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'selection' as const,
      minScore: 80,
      skipAllowed: false
    },
    {
      id: 'short-questions',
      title: 'Deep Understanding Check',
      content: (
        <ShortQuestions
          title="Deep Understanding Check"
          description="Answer these questions to demonstrate your understanding of psychological biases and how to overcome them"
          questions={[
            {
              id: 'q1',
              question: "Explain why confirmation bias is particularly dangerous for investors and how it can lead to poor decision-making.",
              hint: "Think about how it affects information gathering and analysis",
              correctAnswer: "Confirmation bias is dangerous because it leads investors to only seek and interpret information that supports their existing beliefs, ignoring warning signs and negative data that could prevent losses.",
              explanation: "This bias creates a false sense of security and prevents objective analysis of investment decisions."
            },
            {
              id: 'q2',
              question: "How can keeping an investment journal help overcome psychological biases?",
              hint: "Consider the role of self-reflection and learning",
              correctAnswer: "An investment journal forces logical thinking, documents decision-making processes, and helps identify patterns in your behavior that may be influenced by biases.",
              explanation: "Regular journaling promotes self-awareness and helps develop better investment discipline over time."
            },
            {
              id: 'q3',
              question: "What are the key differences between cognitive biases and emotional biases, and why is this distinction important for investors?",
              hint: "Think about how each type affects decision-making",
              correctAnswer: "Cognitive biases affect how we process information (like confirmation bias), while emotional biases affect how we feel about decisions (like loss aversion). Understanding both helps develop comprehensive strategies to overcome them.",
              explanation: "Different types of biases require different counter-strategies, so recognizing the distinction is crucial for effective bias management."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('short-questions', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'short-answer' as const,
      skipAllowed: false
    },
    {
      id: 'conclusion',
      title: 'Conclusion: Your Mind is Your Greatest Asset (or Liability)',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('conclusion_title') as string}</h3>
            <p className="text-green-700 text-lg">{t('conclusion_p1') as string}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Takeaways</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Psychological biases are the biggest enemy of successful investing</p>
              <p>• Self-awareness is the first step to overcoming biases</p>
              <p>• Emotional discipline is more important than analytical skills</p>
              <p>• Systematic approaches help eliminate emotional decision-making</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">What's Next?</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Start implementing the strategies you learned</p>
              <p>• Create your investment plan and journal</p>
              <p>• Practice recognizing biases in real-time</p>
              <p>• Build emotional discipline through consistent practice</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Psychological Bias Awareness Commitment"
            description="Please confirm that you understand the importance of managing psychological biases"
            checkboxes={[
              "I understand that psychological biases can harm my investment returns",
              "I will work to recognize when biases are affecting my decisions",
              "I will implement strategies to overcome these biases",
              "I will focus on building emotional discipline in my investing"
            ]}
            partId="conclusion"
            onPartComplete={(partId, score) => {
              if ((window as any).__multiPartLessonComplete) {
                (window as any).__multiPartLessonComplete(partId, score);
              }
            }}
          />
        </div>
      ),
      isRequired: true,
      type: 'interactive' as const,
      skipAllowed: false
    }
  ];

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="the-investors-mind-managing-psychological-biases"
    >
      <MultiPartLesson
        parts={lessonParts}
        onComplete={handleComplete}
        onPartComplete={handlePartComplete}
        className="max-w-4xl mx-auto"
      />
    </LessonLayout>
  );
}
