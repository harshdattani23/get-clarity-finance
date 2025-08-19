"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LessonLayout from '../LessonLayout';

export default function WhatIsAStockPage() {
  const { t } = useTranslation('stock-market-course/what-is-a-stock');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="what-is-a-stock"
    >
      <div className="prose prose-lg max-w-none">
        <h2>{t('simpleDefinition')}</h2>
        <p>{t('simpleDefinitionP1')}</p>
        <p>{t('simpleDefinitionP2')}</p>

        <h2>{t('ownershipVisualTitle')}</h2>
        <p>{t('ownershipVisualP1')}</p>
        <p>{t('ownershipVisualP2')}</p>

        <h2>{t('whyCompaniesIssue')}</h2>
        <p>{t('whyCompaniesIssueP1')}</p>

        <h3>{t('fundingGrowth')}</h3>
        <p>{t('fundingGrowthP')}</p>

        <h3>{t('goingPublic')}</h3>
        <p>{t('goingPublicP')}</p>

        <h2>{t('whyPeopleBuy')}</h2>
        <p>{t('whyPeopleBuyP')}</p>

        <h3>{t('capitalGains')}</h3>
        <p>{t('capitalGainsP')}</p>

        <h3>{t('dividends')}</h3>
        <p>{t('dividendsP')}</p>

        <h2>{t('keyTakeaways')}</h2>
        <ul>
          <li>{t('takeaway1')}</li>
          <li>{t('takeaway2')}</li>
          <li>{t('takeaway3')}</li>
          <li>{t('takeaway4')}</li>
        </ul>

        <h2>{t('keyTerms')}</h2>
        <ul>
          <li>{t('term1')}</li>
          <li>{t('term2')}</li>
          <li>{t('term3')}</li>
          <li>{t('term4')}</li>
        </ul>
      </div>
    </LessonLayout>
  );
}
