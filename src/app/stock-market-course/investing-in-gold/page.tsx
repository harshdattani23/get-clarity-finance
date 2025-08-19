"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';
import { BookOpen, AlertTriangle } from 'lucide-react';

export default function InvestingInGoldPage() {
  const { t } = useTranslation('stock-market-course.investing-in-gold');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="investing-in-gold"
    >
      <div className="space-y-8">

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whyInvestInGold') as string}</h2>
           
           <p className="text-gray-700 mb-6">
             {t('whyInvestInGoldP1') as string}
           </p>

           <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
             <div className="flex items-start">
               <BookOpen className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
               <div>
                 <h4 className="font-semibold text-blue-900">{t('keyTakeaway') as string}</h4>
                 <p className="text-blue-800">
                   {t('keyTakeawayP') as string}
                 </p>
               </div>
             </div>
           </div>

           <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('benefitsOfGoldInvestment') as string}</h3>
           
           <div className="grid md:grid-cols-2 gap-6 mb-8">
             <div className="bg-yellow-50 p-4 rounded-lg">
               <h4 className="font-semibold text-yellow-900 mb-2">🛡️ {t('inflationHedge') as string}</h4>
               <p className="text-yellow-800 text-sm">
                 {t('inflationHedgeP') as string}
               </p>
             </div>
             
             <div className="bg-blue-50 p-4 rounded-lg">
               <h4 className="font-semibold text-blue-900 mb-2">📊 {t('portfolioDiversification') as string}</h4>
               <p className="text-blue-800 text-sm">
                 {t('portfolioDiversificationP') as string}
               </p>
             </div>
             
             <div className="bg-green-50 p-4 rounded-lg">
               <h4 className="font-semibold text-green-900 mb-2">💱 {t('currencyHedge') as string}</h4>
               <p className="text-green-800 text-sm">
                 {t('currencyHedgeP') as string}
               </p>
             </div>
             
             <div className="bg-purple-50 p-4 rounded-lg">
               <h4 className="font-semibold text-purple-900 mb-2">🌍 {t('globalAcceptance') as string}</h4>
               <p className="text-purple-800 text-sm">
                 {t('globalAcceptanceP') as string}
               </p>
             </div>
             
             <div className="bg-orange-50 p-4 rounded-lg">
               <h4 className="font-semibold text-orange-900 mb-2">📈 {t('longTermGrowth') as string}</h4>
               <p className="text-orange-800 text-sm">
                 {t('longTermGrowthP') as string}
               </p>
             </div>
             
             <div className="bg-indigo-50 p-4 rounded-lg">
               <h4 className="font-semibold text-indigo-900 mb-2">🎯 {t('culturalSignificance') as string}</h4>
               <p className="text-indigo-800 text-sm">
                 {t('culturalSignificanceP') as string}
               </p>
             </div>
           </div>

           <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('waysToInvestInGold') as string}</h3>
           
           <div className="space-y-6 mb-8">
             <div className="border border-gray-200 rounded-lg p-6">
               <div className="flex items-start space-x-4">
                 <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🥇</div>
                 <div>
                   <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('physicalGold') as string}</h4>
                   <p className="text-gray-700 mb-4">
                     {t('physicalGoldP') as string}
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-4">
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">✅ {t('advantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('tangibleAsset') as string}</li>
                         <li>• {t('noCounterpartyRisk') as string}</li>
                         <li>• {t('culturalValue') as string}</li>
                         <li>• {t('canBeUsedAsJewelry') as string}</li>
                       </ul>
                     </div>
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">❌ {t('disadvantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('storageConcerns') as string}</li>
                         <li>• {t('makingCharges') as string}</li>
                         <li>• {t('purityVerification') as string}</li>
                         <li>• {t('lowerLiquidity') as string}</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="border border-gray-200 rounded-lg p-6">
               <div className="flex items-start space-x-4">
                 <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">📊</div>
                 <div>
                   <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('goldEtfs') as string}</h4>
                   <p className="text-gray-700 mb-4">
                     {t('goldEtfsP') as string}
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-4">
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">✅ {t('advantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('highLiquidity') as string}</li>
                         <li>• {t('lowerExpenseRatio') as string}</li>
                         <li>• {t('noStorageConcerns') as string}</li>
                         <li>• {t('canBeTradedAnytime') as string}</li>
                       </ul>
                     </div>
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">❌ {t('disadvantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('requiresDematAccount') as string}</li>
                         <li>• {t('tradingCosts') as string}</li>
                         <li>• {t('noPhysicalPossession') as string}</li>
                         <li>• {t('marketTimingRisk') as string}</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="border border-gray-200 rounded-lg p-6">
               <div className="flex items-start space-x-4">
                 <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏛️</div>
                 <div>
                   <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('sovereignGoldBonds') as string}</h4>
                   <p className="text-gray-700 mb-4">
                     {t('sovereignGoldBondsP') as string}
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-4">
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">✅ {t('advantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('governmentGuarantee') as string}</li>
                         <li>• {t('annualInterest') as string}</li>
                         <li>• {t('taxBenefits') as string}</li>
                         <li>• {t('noStorageCosts') as string}</li>
                       </ul>
                     </div>
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">❌ {t('disadvantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('lockInPeriod') as string}</li>
                         <li>• {t('limitedLiquidity') as string}</li>
                         <li>• {t('availableOnlyDuringIssue') as string}</li>
                         <li>• {t('noPhysicalDelivery') as string}</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="border border-gray-200 rounded-lg p-6">
               <div className="flex items-start space-x-4">
                 <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏦</div>
                 <div>
                   <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('digitalGold') as string}</h4>
                   <p className="text-gray-700 mb-4">
                     {t('digitalGoldP') as string}
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-4">
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">✅ {t('advantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('startWithSmallAmounts') as string}</li>
                         <li>• {t('easyToBuySell') as string}</li>
                         <li>• {t('optionForPhysicalDelivery') as string}</li>
                         <li>• {t('noMakingCharges') as string}</li>
                       </ul>
                     </div>
                     <div className="bg-gray-50 p-3 rounded">
                       <h5 className="font-semibold text-gray-900 mb-2">❌ {t('disadvantages') as string}</h5>
                       <ul className="text-sm text-gray-700 space-y-1">
                         <li>• {t('platformRisk') as string}</li>
                         <li>• {t('higherPremiums') as string}</li>
                         <li>• {t('limitedPlatforms') as string}</li>
                         <li>• {t('conversionFees') as string}</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('factorsAffectingGoldPrices') as string}</h3>
           
           <div className="bg-gray-50 rounded-lg p-6 mb-8">
             <div className="grid md:grid-cols-2 gap-4">
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🌍 {t('globalFactors') as string}</h4>
                 <ul className="text-gray-700 text-sm space-y-1">
                   <li>• {t('usDollarStrength') as string}</li>
                   <li>• {t('globalEconomicConditions') as string}</li>
                   <li>• {t('centralBankPolicies') as string}</li>
                   <li>• {t('geopoliticalTensions') as string}</li>
                   <li>• {t('oilPrices') as string}</li>
                 </ul>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🇮🇳 {t('indianFactors') as string}</h4>
                 <ul className="text-gray-700 text-sm space-y-1">
                   <li>• {t('rupeeDollarRate') as string}</li>
                   <li>• {t('domesticDemand') as string}</li>
                   <li>• {t('importDuties') as string}</li>
                   <li>• {t('rbiGoldReserves') as string}</li>
                   <li>• {t('seasonalPatterns') as string}</li>
                 </ul>
               </div>
             </div>
           </div>

           <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('goldInvestmentStrategies') as string}</h3>
           
           <div className="space-y-4 mb-8">
             <div className="border-l-4 border-green-500 pl-4">
               <h4 className="font-semibold text-gray-900 mb-2">📈 {t('longTermInvestment') as string}</h4>
               <p className="text-gray-700 text-sm">
                 {t('longTermInvestmentP') as string}
               </p>
             </div>
             
             <div className="border-l-4 border-blue-500 pl-4">
               <h4 className="font-semibold text-gray-900 mb-2">⚖️ {t('portfolioAllocation') as string}</h4>
               <p className="text-gray-700 text-sm">
                 {t('portfolioAllocationP') as string}
               </p>
             </div>
             
             <div className="border-l-4 border-purple-500 pl-4">
               <h4 className="font-semibold text-gray-900 mb-2">🔄 {t('systematicInvestment') as string}</h4>
               <p className="text-gray-700 text-sm">
                 {t('systematicInvestmentP') as string}
               </p>
             </div>
             
             <div className="border-l-4 border-orange-500 pl-4">
               <h4 className="font-semibold text-gray-900 mb-2">🎯 {t('tacticalAllocation') as string}</h4>
               <p className="text-gray-700 text-sm">
                 {t('tacticalAllocationP') as string}
               </p>
             </div>
           </div>

           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
             <div className="flex items-start">
               <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
               <div>
                 <h4 className="font-semibold text-yellow-900">{t('importantConsiderations') as string}</h4>
                 <p className="text-yellow-800">
                   {t('importantConsiderationsP') as string}
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </LessonLayout>
   );
}
