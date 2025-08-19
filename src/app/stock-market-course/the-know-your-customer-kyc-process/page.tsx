"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { FileText, ShieldCheck, UserCheck, Banknote } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function KYCProcessPage() {
    const { t } = useTranslation('stock-market-course.the-know-your-customer-kyc-process');
  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="the-know-your-customer-kyc-process"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('whatIsKyc')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('whatIsKycP1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('whatIsKycP2') }} />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('whyIsKycImportant')}</h2>
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <ShieldCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('preventsFraud')}</h3>
              <p className="text-gray-600">{t('preventsFraudP')}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Banknote className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('combatsMoneyLaundering')}</h3>
              <p className="text-gray-600">{t('combatsMoneyLaunderingP')}</p>
            </div>
          </li>
          <li className="flex items-start">
            <UserCheck className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-bold text-lg text-gray-800">{t('protectsInvestors')}</h3>
                <p className="text-gray-600">{t('protectsInvestorsP')}</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('documentsRequired')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('documentsRequiredP') }}/>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" />{t('proofOfIdentity')}</h3>
            <p className="text-gray-700">{t('proofOfIdentityP')}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold text-lg text-purple-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" />{t('proofOfAddress')}</h3>
            <p className="text-gray-700">{t('proofOfAddressP')}</p>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
