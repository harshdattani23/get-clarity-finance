"use client";

import LessonLayout from "../LessonLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { FileText, ShieldCheck, UserCheck, Banknote } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function KYCProcessPage() {
    const { t } = useTranslation();
  return (
    <LessonLayout
      title={t('the-know-your-customer-kyc-process.title')}
      description={t('the-know-your-customer-kyc-process.description')}
      lessonSlug="the-know-your-customer-kyc-process"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('the-know-your-customer-kyc-process.whatIsKyc')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.whatIsKycP1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.whatIsKycP2') }} />
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('the-know-your-customer-kyc-process.whyIsKycImportant')}</h2>
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <ShieldCheck className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('the-know-your-customer-kyc-process.preventsFraud')}</h3>
              <p className="text-gray-600">{t('the-know-your-customer-kyc-process.preventsFraudP')}</p>
            </div>
          </li>
          <li className="flex items-start">
            <Banknote className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">{t('the-know-your-customer-kyc-process.combatsMoneyLaundering')}</h3>
              <p className="text-gray-600">{t('the-know-your-customer-kyc-process.combatsMoneyLaunderingP')}</p>
            </div>
          </li>
          <li className="flex items-start">
            <UserCheck className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-bold text-lg text-gray-800">{t('the-know-your-customer-kyc-process.protectsInvestors')}</h3>
                <p className="text-gray-600">{t('the-know-your-customer-kyc-process.protectsInvestorsP')}</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">{t('the-know-your-customer-kyc-process.documentsRequired')}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.documentsRequiredP') }}/>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" />{t('the-know-your-customer-kyc-process.proofOfIdentity')}</h3>
            <p className="text-gray-700">{t('the-know-your-customer-kyc-process.proofOfIdentityP')}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold text-lg text-purple-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" />{t('the-know-your-customer-kyc-process.proofOfAddress')}</h3>
            <p className="text-gray-700">{t('the-know-your-customer-kyc-process.proofOfAddressP')}</p>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('the-know-your-customer-kyc-process.keyTakeaways')}</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.takeaway1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.takeaway2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.takeaway3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('the-know-your-customer-kyc-process.takeaway4') }} />
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
