"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { Wallet, Landmark, CheckCircle } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function OpeningDematAccountPage() {
    const { t } = useTranslation('stock-market-course.opening-a-demat-and-trading-account');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="opening-a-demat-and-trading-account"
    >
        <AnimatedDiv>
            <p className="text-lg" dangerouslySetInnerHTML={{ __html: t('intro') }} />

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Wallet className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-800" dangerouslySetInnerHTML={{ __html: t('dematAccount.title') }} />
                    </div>
                    <p className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: t('dematAccount.p1') }} />
                    <p className="mt-4 font-semibold text-blue-700" dangerouslySetInnerHTML={{ __html: t('dematAccount.purpose') }} />
                    <p className="mt-2 text-sm text-blue-600" dangerouslySetInnerHTML={{ __html: t('dematAccount.analogy') }} />
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Landmark className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800" dangerouslySetInnerHTML={{ __html: t('tradingAccount.title') }} />
                    </div>
                    <p className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: t('tradingAccount.p1') }} />
                    <p className="mt-4 font-semibold text-green-700" dangerouslySetInnerHTML={{ __html: t('tradingAccount.purpose') }} />
                    <p className="mt-2 text-sm text-green-600" dangerouslySetInnerHTML={{ __html: t('tradingAccount.analogy') }} />
                </div>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
            <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6" dangerouslySetInnerHTML={{ __html: t('howTheyWork.title') }} />
            <div className="relative">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" aria-hidden="true"></div>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 pl-12 relative">
                        <div className="absolute left-0 flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">1</div>
                        <p dangerouslySetInnerHTML={{ __html: t('howTheyWork.step1') }} />
                    </div>
                    <div className="flex items-center gap-4 pl-12 relative">
                         <div className="absolute left-0 flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">2</div>
                        <p dangerouslySetInnerHTML={{ __html: t('howTheyWork.step2') }} />
                    </div>
                    <div className="flex items-center gap-4 pl-12 relative">
                         <div className="absolute left-0 flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">3</div>
                        <p dangerouslySetInnerHTML={{ __html: t('howTheyWork.step3') }} />
                    </div>
                    <div className="flex items-center gap-4 pl-12 relative">
                         <div className="absolute left-0 flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">4</div>
                        <p dangerouslySetInnerHTML={{ __html: t('howTheyWork.step4') }} />
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="font-semibold" dangerouslySetInnerHTML={{ __html: t('howTheyWork.sellProcess') }} />
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <div className="mt-12 p-6 bg-white rounded-xl shadow-md border">
                <h3 className="text-2xl font-bold text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: t('keyTakeaways.title') }} />
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: t('keyTakeaways.item1') }} />
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: t('keyTakeaways.item2') }} />
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: t('keyTakeaways.item3') }} />
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                        <span dangerouslySetInnerHTML={{ __html: t('keyTakeaways.item4') }} />
                    </li>
                </ul>
            </div>
        </AnimatedDiv>
    </LessonLayout>
  );
}
