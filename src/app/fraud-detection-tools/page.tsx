"use client";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, Bot } from "lucide-react";

const FraudDetectionToolsPage = () => {
  const { t } = useTranslation("fraud-detection-tools");

  const tools = [
    {
      title: t("deepfakeDetector.title"),
      description: t("deepfakeDetector.description"),
      icon: <Bot className="w-8 h-8 text-blue-500" />,
    },
    {
      title: t("socialMonitor.title"),
      description: t("socialMonitor.description"),
      icon: <Search className="w-8 h-8 text-green-500" />,
    },
    {
      title: t("advisorVerifier.title"),
      description: t("advisorVerifier.description"),
      icon: <Shield className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {t("subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-4">
                {tool.icon}
                <CardTitle>{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FraudDetectionToolsPage;

