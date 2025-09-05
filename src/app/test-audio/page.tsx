import AudioTest from '@/components/AudioTest';
import CourseAudioPlayer from '@/components/CourseAudioPlayer';

export default function TestAudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Audio System Test</h1>
        
        {/* Basic Audio Test */}
        <AudioTest />
        
        {/* Course Audio Player Tests */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Course Audio Player Tests</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Module 1 - English</h3>
              <CourseAudioPlayer
                courseId="module1"
                language="en"
                className="mb-4"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Module 1 - Hindi</h3>
              <CourseAudioPlayer
                courseId="module1"
                language="hi"
                className="mb-4"
              />
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Introduction - English</h3>
              <CourseAudioPlayer
                courseId="introduction"
                language="en"
                className="mb-4"
              />
            </div>
          </div>
        </div>
        
        {/* Upload Manager Link */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="font-medium text-blue-800 mb-2">Ready to Upload New Audio?</h3>
          <p className="text-blue-600 mb-4">
            Use the admin interface to upload audio files for your fraud detection courses
          </p>
          <a
            href="/admin/audio-upload"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Audio Upload Manager
          </a>
        </div>
      </div>
    </div>
  );
}
