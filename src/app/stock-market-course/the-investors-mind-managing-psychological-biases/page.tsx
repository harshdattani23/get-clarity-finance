"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import { BrainCircuit, Zap, Users, Shield } from "lucide-react";
import Image from "next/image";

export default function PsychologicalBiasesPage() {
    const { t } = useTranslation('stock-market-course');
    const lessonKey = "the-investor's-mind-managing-psychological-biases";
  return (
    <LessonLayout
      title={t(`${lessonKey}.title`)}
      description={t(`${lessonKey}.description`)}
      lessonSlug="the-investors-mind-managing-psychological-biases"
    >
      <AnimatedDiv>
        <p className="mb-6 text-lg" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.intro`) }} />
        <div className="flex justify-center my-8">
            <Image
                src="https://images.unsplash.com/photo-1589793463343-54d436e43598?q=80&w=2070&auto=format&fit=crop"
                alt="A visual representation of a complex mind"
                width={800}
                height={450}
                className="rounded-lg shadow-xl"
            />
        </div>
      </AnimatedDiv>
      
      <div className="space-y-12 mt-10">
        <AnimatedDiv delay={0.2}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="flex items-center text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              <BrainCircuit className="mr-3" />
              {t(`${lessonKey}.confirmationBias.title`)}
            </h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.confirmationBias.p1`) }} />
            <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-md">
                <p><strong>{t('common.example')}:</strong> {t(`${lessonKey}.confirmationBias.example`)}</p>
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="flex items-center text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              <Zap className="mr-3" />
              {t(`${lessonKey}.overconfidenceBias.title`)}
            </h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.overconfidenceBias.p1`) }} />
            <div className="p-4 bg-red-50 dark:bg-gray-700 rounded-md">
                <p><strong>{t('common.example')}:</strong> {t(`${lessonKey}.overconfidenceBias.example`)}</p>
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.6}>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="flex items-center text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
              <Users className="mr-3" />
              {t(`${lessonKey}.herdingBias.title`)}
            </h3>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.herdingBias.p1`) }} />
            <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-md">
                <p><strong>{t('common.example')}:</strong> {t(`${lessonKey}.herdingBias.example`)}</p>
            </div>
          </div>
        </AnimatedDiv>
        
        <AnimatedDiv delay={0.8}>
          <div className="p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg shadow-xl border border-yellow-300">
            <h3 className="flex items-center text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-300">
              <Shield className="mr-3" />
              {t(`${lessonKey}.howToMitigate.title`)}
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.howToMitigate.item1`) }} />
              <li dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.howToMitigate.item2`) }} />
              <li dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.howToMitigate.item3`) }} />
              <li dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.howToMitigate.item4`) }} />
            </ul>
          </div>
        </AnimatedDiv>
      </div>

    </LessonLayout>
  );
}
