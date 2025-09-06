import EnhancedAudioPlayer from '@/components/EnhancedAudioPlayer';

export default function TestAudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Multi-Language Audio Player</h1>
          <p className="text-gray-600">
            Test the audio player with different languages and advanced controls
          </p>
        </div>
        
        <EnhancedAudioPlayer className="max-w-3xl mx-auto" />
      </div>
    </div>
  );
}
