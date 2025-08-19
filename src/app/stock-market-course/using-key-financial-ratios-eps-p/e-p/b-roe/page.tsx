"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LessonLayout from '../../../LessonLayout';
import { FaChartLine, FaBalanceScale, FaBook, FaBullseye } from "react-icons/fa";
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function UsingKeyFinancialRatiosPage() {
    const { t } = useTranslation('stock-market-course/using-key-financial-ratios-eps-p/e-p/b-roe');
    const lessonKey = "using-key-financial-ratios-eps-p/e-p/b-roe";

    const renderKeyTakeaways = () => (
        <div className="p-6 bg-gray-50 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t(`${lessonKey}.takeaways.title`) as string}</h3>
            <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <li key={i} className="flex items-start">
                        <FaBullseye className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.takeaways.item${i + 1}`) }} />
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderSummaryTable = () => (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{t(`${lessonKey}.summaryTable.title`) as string}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t(`${lessonKey}.summaryTable.ratio`) as string}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t(`${lessonKey}.summaryTable.whatItMeasures`) as string}</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t(`${lessonKey}.summaryTable.ruleOfThumb`) as string}</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EPS</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.eps`) as string}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.epsRule`) as string}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P/E</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.pe`) as string}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.peRule`) as string}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">P/B</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.pb`) as string}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.pbRule`) as string}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ROE</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.roe`) as string}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t(`${lessonKey}.summaryTable.roeRule`) as string}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const ratios = [
        {
            key: "eps",
            icon: <FaChartLine className="text-4xl text-blue-500" />
        },
        {
            key: "pe",
            icon: <FaBalanceScale className="text-4xl text-purple-500" />
        },
        {
            key: "pb",
            icon: <FaBook className="text-4xl text-yellow-500" />
        },
        {
            key: "roe",
            icon: <FaBullseye className="text-4xl text-red-500" />
        },
    ];

    return (
        <LessonLayout
            title={t(`${lessonKey}.title`) as string}
            description={t(`${lessonKey}.description`) as string}
            lessonSlug={lessonKey}
        >
            <div className="space-y-12">
                <AnimatedDiv direction="up">
                    <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.intro`) }} />
                </AnimatedDiv>

                <div className="space-y-10">
                    {ratios.map((ratio, index) => (
                        <AnimatedDiv key={ratio.key} direction={index % 2 === 0 ? "left" : "right"}>
                            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0">{ratio.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.title`) }} />
                                        <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.p1`) }} />
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <p className="text-sm text-gray-800 font-mono mb-2" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.formula`) }} />
                                            <p className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.whatItTells`) }} />
                                            {t(`${lessonKey}.${ratio.key}.highPe`) && <p className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.highPe`) }} />}
                                            {t(`${lessonKey}.${ratio.key}.lowPe`) && <p className="text-sm text-gray-700 mt-1" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.lowPe`) }} />}
                                            {t(`${lessonKey}.${ratio.key}.comparison`) && <p className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.comparison`) }} />}
                                            {t(`${lessonKey}.${ratio.key}.value`) && <p className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.value`) }} />}
                                            {t(`${lessonKey}.${ratio.key}.consistency`) && <p className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: t(`${lessonKey}.${ratio.key}.consistency`) }} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedDiv>
                    ))}
                </div>

                <AnimatedDiv direction="up">
                    {renderSummaryTable()}
                </AnimatedDiv>

                <AnimatedDiv direction="up">
                    {renderKeyTakeaways()}
                </AnimatedDiv>
            </div>
        </LessonLayout>
    );
}
