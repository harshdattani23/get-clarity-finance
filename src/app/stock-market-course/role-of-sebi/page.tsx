'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Shield, BookUser, AlertTriangle } from 'lucide-react';

const RoleOfSebi = () => {
  const { t } = useTranslation();

  return (
    <LessonLayout
      title={t('role-of-sebi.title')}
      description={t('role-of-sebi.description')}
      lessonSlug="role-of-sebi"
    >
      <div className="space-y-8">

        <p className="text-gray-700 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('role-of-sebi.intro') }} />

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('role-of-sebi.mandate.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border text-center">
              <Shield className="mx-auto w-12 h-12 text-blue-500 mb-3" />
              <h3 className="font-bold text-lg">{t('role-of-sebi.mandate.item1.title')}</h3>
              <p className="text-sm text-gray-600">{t('role-of-sebi.mandate.item1.p')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border text-center">
              <BookUser className="mx-auto w-12 h-12 text-green-500 mb-3" />
              <h3 className="font-bold text-lg">{t('role-of-sebi.mandate.item2.title')}</h3>
              <p className="text-sm text-gray-600">{t('role-of-sebi.mandate.item2.p')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border text-center">
              <AlertTriangle className="mx-auto w-12 h-12 text-red-500 mb-3" />
              <h3 className="font-bold text-lg">{t('role-of-sebi.mandate.item3.title')}</h3>
              <p className="text-sm text-gray-600">{t('role-of-sebi.mandate.item3.p')}</p>
            </div>
          </div>
        </div>
        
        {/* Key Takeaways */}
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('what-is-a-stock.keyTakeaways')}</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li dangerouslySetInnerHTML={{ __html: t('role-of-sebi.takeaways.item1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('role-of-sebi.takeaways.item2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('role-of-sebi.takeaways.item3') }} />
            </ul>
        </div>
      </div>
    </LessonLayout>
  );
};

export default RoleOfSebi;
