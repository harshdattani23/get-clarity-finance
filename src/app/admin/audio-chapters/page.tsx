"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { Music, ArrowLeft, Download, Upload } from "lucide-react";
import Link from "next/link";
import AudioChapterMarker from "@/components/admin/AudioChapterMarker";
import AIChapterGenerator from "@/components/admin/AIChapterGenerator";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

// Audio file configuration for different languages
const AUDIO_CONFIG = {
  baseUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/',
  languages: [
    { code: 'en', name: 'English', file: 'english.m4a' },
    { code: 'hi', name: 'हिंदी (Hindi)', file: 'hindi.m4a' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', file: 'gujarati.m4a' },
    { code: 'mr', name: 'मराठी (Marathi)', file: 'marathi.m4a' },
    { code: 'ta', name: 'தமிழ் (Tamil)', file: 'tamil.m4a' },
    { code: 'te', name: 'తెలుగు (Telugu)', file: 'telugu.m4a' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', file: 'Kannada.m4a' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', file: 'malyalam.m4a' },
    { code: 'bn', name: 'বাংলা (Bengali)', file: 'bengali.m4a' }
  ]
};

export default function AudioChaptersAdmin() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (user) {
      const userEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress;

      if (userEmail !== ADMIN_EMAIL) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [user, router]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const selectedLangConfig = AUDIO_CONFIG.languages.find(lang => lang.code === selectedLanguage);
  const audioUrl = selectedLangConfig ? `${AUDIO_CONFIG.baseUrl}${selectedLangConfig.file}` : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Link>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Music className="w-6 h-6 text-purple-600" />
                  Audio Chapter Manager
                </h1>
                <p className="text-sm text-gray-500 mt-1">Create accurate chapter markers for audio lessons</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Language Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Audio Language</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {AUDIO_CONFIG.languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-3 text-sm rounded-lg border transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-purple-100 border-purple-300 text-purple-800 font-medium'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-purple-50'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* AI Chapter Generator */}
        <AIChapterGenerator
          audioUrl={audioUrl}
          languageCode={selectedLanguage}
          languageName={selectedLangConfig?.name}
        />

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8 mt-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 How to Use This Tool</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">📝 Step-by-Step Process:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Select the language audio file above</li>
                <li>Play the audio and listen carefully</li>
                <li>When you hear a topic change, pause the audio</li>
                <li>Enter the chapter title and click "Add Chapter"</li>
                <li>Repeat for all chapters in the audio</li>
                <li>Download the configuration when done</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2">💡 Tips for Better Chapters:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use descriptive, clear chapter titles</li>
                <li>Mark chapters at natural topic breaks</li>
                <li>Skip back 5-10 seconds and re-listen if unsure</li>
                <li>Aim for 3-6 chapters per audio lesson</li>
                <li>Keep chapter titles under 50 characters</li>
                <li>Test the "Jump To" buttons to verify accuracy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Audio Chapter Marker Tool */}
        {selectedLangConfig && (
          <AudioChapterMarker
            audioUrl={audioUrl}
            languageCode={selectedLanguage}
            languageName={selectedLangConfig.name}
          />
        )}

        {/* Implementation Instructions */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">🔧 Implementation Instructions</h3>
          <div className="text-sm text-yellow-800 space-y-3">
            <p>
              After creating chapters for all languages, you'll need to update the audio player component:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                <strong>Copy the generated JSON configuration</strong> from each language
              </li>
              <li>
                <strong>Update the AUDIO_CONFIG</strong> in <code className="bg-yellow-100 px-2 py-1 rounded">Module1AudioPlayer.tsx</code>
              </li>
              <li>
                <strong>Replace the placeholder segments</strong> with your actual chapter data
              </li>
              <li>
                <strong>Test the audio player</strong> to ensure chapter navigation works correctly
              </li>
            </ol>
            <div className="bg-yellow-100 p-3 rounded mt-4">
              <p className="font-medium">File Location:</p>
              <code className="text-xs">src/components/investment-security-course/Module1AudioPlayer.tsx</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
