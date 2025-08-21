# Lesson Page Structure - Audio & Text Based Learning

## Overview
Each lesson page will support two learning modes:
1. **Audio-Based Learning** - AI-generated audio summaries with transcripts
2. **Text-Based Learning** - Comprehensive written content with examples

## Page Structure

### Header Section
```
┌─────────────────────────────────────────────────────────┐
│ [Course Title] > [Module] > [Lesson Title]              │
│ 🤖 AI Audio Summary | 📖 Text Lesson                    │
└─────────────────────────────────────────────────────────┘
```

### Learning Mode Toggle
```
┌─────────────────────────────────────────────────────────┐
│ [Audio Mode] [Text Mode]                                │
│ 🎧 Listen & Learn    📚 Read & Learn                    │
└─────────────────────────────────────────────────────────┘
```

## Audio-Based Learning Mode

### Audio Player Section
```
┌─────────────────────────────────────────────────────────┐
│ 🎧 AI Generated Audio Summary                           │
│                                                         │
│ [Language Selector: EN | HI | BN | MR | TA | GU]       │
│                                                         │
│ [Audio Player Controls]                                 │
│ ▶️ Play | ⏸️ Pause | 🔄 Restart | ⬇️ Download          │
│                                                         │
│ [Progress Bar] [Volume Control]                         │
│                                                         │
│ [Transcript Panel - Collapsible]                       │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Transcript in selected language                     │ │
│ │ [Show/Hide Transcript]                             │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Audio Content Structure
```json
{
  "audioMode": {
    "languages": {
      "en": {
        "audioUrl": "path/to/audio-en.m4a",
        "transcript": "Full transcript text...",
        "summary": "Brief summary for this lesson..."
      },
      "hi": {
        "audioUrl": "path/to/audio-hi.m4a",
        "transcript": "हिंदी में पूरा ट्रांसक्रिप्ट...",
        "summary": "इस पाठ का संक्षिप्त सारांश..."
      }
      // ... other languages
    }
  }
}
```

## Text-Based Learning Mode

### Text Content Section
```
┌─────────────────────────────────────────────────────────┐
│ 📖 [Lesson Title]                                       │
│                                                         │
│ [Language Selector: EN | HI | BN | MR | TA | GU]       │
│                                                         │
│ [Comprehensive Text Content]                            │
│ • Introduction                                          │
│ • Key Concepts                                          │
│ • Examples & Case Studies                               │
│ • Practice Questions                                    │
│ • Summary                                               │
│                                                         │
│ [Navigation: Previous | Next]                           │
└─────────────────────────────────────────────────────────┘
```

### Text Content Structure
```json
{
  "textMode": {
    "languages": {
      "en": {
        "title": "What is a Stock?",
        "introduction": "Detailed introduction...",
        "keyConcepts": ["Concept 1", "Concept 2"],
        "examples": [
          {
            "title": "Example 1",
            "description": "Detailed example...",
            "code": "if applicable"
          }
        ],
        "practiceQuestions": [
          {
            "question": "What is...?",
            "options": ["A", "B", "C", "D"],
            "correct": "A",
            "explanation": "Why A is correct..."
          }
        ],
        "summary": "Lesson summary..."
      },
      "hi": {
        "title": "स्टॉक क्या है?",
        "introduction": "विस्तृत परिचय...",
        // ... rest of content in Hindi
      }
      // ... other languages
    }
  }
}
```

## Implementation Strategy

### 1. File Structure
```
src/app/stock-market-course/
├── [lesson-slug]/
│   ├── page.tsx                    # Main lesson page
│   ├── audio-content/
│   │   ├── en.json                 # English audio content
│   │   ├── hi.json                 # Hindi audio content
│   │   ├── bn.json                 # Bengali audio content
│   │   └── ...                     # Other languages
│   └── text-content/
│       ├── en.json                 # English text content
│       ├── hi.json                 # Hindi text content
│       ├── bn.json                 # Bengali text content
│       └── ...                     # Other languages
```

### 2. Component Structure
```tsx
// LessonPage.tsx
export default function LessonPage({ params }: { params: { slug: string } }) {
  const [learningMode, setLearningMode] = useState<'audio' | 'text'>('audio');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  return (
    <div className="lesson-container">
      <LessonHeader />
      <LearningModeToggle 
        mode={learningMode} 
        onModeChange={setLearningMode} 
      />
      
      {learningMode === 'audio' ? (
        <AudioLearningMode 
          language={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      ) : (
        <TextLearningMode 
          language={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      )}
    </div>
  );
}
```

### 3. Audio Learning Component
```tsx
// AudioLearningMode.tsx
export default function AudioLearningMode({ 
  language, 
  onLanguageChange 
}: AudioLearningProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  return (
    <div className="audio-learning-container">
      <LanguageSelector 
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />
      
      <AudioPlayer 
        language={language}
        isPlaying={isPlaying}
        onPlayPause={setIsPlaying}
      />
      
      <TranscriptPanel 
        language={language}
        isVisible={showTranscript}
        onToggle={setShowTranscript}
      />
    </div>
  );
}
```

### 4. Text Learning Component
```tsx
// TextLearningMode.tsx
export default function TextLearningMode({ 
  language, 
  onLanguageChange 
}: TextLearningProps) {
  return (
    <div className="text-learning-container">
      <LanguageSelector 
        currentLanguage={language}
        onLanguageChange={onLanguageChange}
      />
      
      <LessonContent language={language} />
      <PracticeQuestions language={language} />
      <NavigationButtons />
    </div>
  );
}
```

## Content Creation Strategy

### Audio Content
- **AI-Generated Summaries**: Use the markdown files we created
- **Professional Voice**: Human-like AI voices for each language
- **Duration**: 3-5 minutes per lesson
- **Structure**: Introduction → Key Points → Examples → Summary

### Text Content
- **Comprehensive**: Detailed explanations with examples
- **Interactive**: Practice questions and exercises
- **Visual**: Charts, diagrams, and infographics
- **Progressive**: Builds on previous lessons

## Language Support
- **Primary**: English, Hindi
- **Secondary**: Bengali, Marathi, Tamil, Gujarati
- **Future**: Telugu, Kannada, Malayalam, Punjabi

## User Experience Features

### 1. Progress Tracking
- Save user's preferred learning mode
- Track completion status
- Bookmark favorite lessons

### 2. Accessibility
- Screen reader support
- Keyboard navigation
- High contrast mode

### 3. Mobile Optimization
- Responsive design
- Touch-friendly controls
- Offline audio download

### 4. Social Features
- Share lessons
- Discussion forums
- Peer learning groups

## Technical Implementation

### 1. State Management
```tsx
// useLessonState.ts
export function useLessonState(lessonId: string) {
  const [learningMode, setLearningMode] = useState<'audio' | 'text'>('audio');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [progress, setProgress] = useState(0);
  
  return {
    learningMode,
    setLearningMode,
    selectedLanguage,
    setSelectedLanguage,
    progress,
    setProgress
  };
}
```

### 2. Content Loading
```tsx
// useLessonContent.ts
export function useLessonContent(lessonId: string, language: string, mode: 'audio' | 'text') {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadContent(lessonId, language, mode);
  }, [lessonId, language, mode]);
  
  return { content, loading };
}
```

### 3. Audio Management
```tsx
// useAudioPlayer.ts
export function useAudioPlayer(audioUrl: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const play = () => { /* implementation */ };
  const pause = () => { /* implementation */ };
  const seek = (time: number) => { /* implementation */ };
  
  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek
  };
}
```

This structure provides a flexible, scalable approach to delivering both audio and text-based learning experiences in multiple languages.
