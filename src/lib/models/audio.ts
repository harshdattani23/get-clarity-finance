import { z } from 'zod';

// Audio file record schema
export const AudioFileSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  language: z.enum(['en', 'en-IN', 'hi', 'bn', 'kn', 'mr', 'te', 'ta', 'ml', 'gu', 'pa']),
  moduleType: z.enum(['main', 'section']),
  sectionId: z.string().nullable(),
  fileName: z.string(),
  originalName: z.string(),
  filePath: z.string(),
  publicUrl: z.string(),
  size: z.number(),
  contentType: z.string(),
  duration: z.number().nullable(), // in seconds
  uploadedBy: z.string().nullable(),
  uploadedAt: z.date(),
  updatedAt: z.date(),
  isActive: z.boolean().default(true),
});

export type AudioFile = z.infer<typeof AudioFileSchema>;

// Create audio file record
export const CreateAudioFileSchema = AudioFileSchema.omit({
  id: true,
  uploadedAt: true,
  updatedAt: true,
});

export type CreateAudioFile = z.infer<typeof CreateAudioFileSchema>;

// Update audio file record
export const UpdateAudioFileSchema = AudioFileSchema.partial().omit({
  id: true,
  uploadedAt: true,
});

export type UpdateAudioFile = z.infer<typeof UpdateAudioFileSchema>;

// Audio file query filters
export const AudioFileFiltersSchema = z.object({
  courseId: z.string().optional(),
  language: z.enum(['en', 'en-IN', 'hi', 'bn', 'kn', 'mr', 'te', 'ta', 'ml', 'gu', 'pa']).optional(),
  moduleType: z.enum(['main', 'section']).optional(),
  isActive: z.boolean().optional(),
});

export type AudioFileFilters = z.infer<typeof AudioFileFiltersSchema>;

// Language information
export const LANGUAGE_INFO = {
  'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  'en-IN': { name: 'English (India)', nativeName: 'English (India)', flag: '🇮🇳' },
  'hi': { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  'bn': { name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  'kn': { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  'mr': { name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  'te': { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  'ta': { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  'ml': { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  'gu': { name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  'pa': { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
} as const;

export type LanguageCode = keyof typeof LANGUAGE_INFO;

// Course information
export const COURSE_INFO = {
  // Existing courses
  'introduction': {
    name: 'What is Stock',
    description: 'Introduction to stock market fundamentals',
    level: 'Beginner',
    estimatedDuration: 5, // minutes
  },
  'module1': {
    name: 'Module 1',
    description: 'Basic trading concepts',
    level: 'Beginner',
    estimatedDuration: 8, // minutes
  },
  // New fraud detection courses
  'intro-to-frauds': {
    name: 'Introduction to Frauds',
    description: 'Basic fraud detection and prevention techniques',
    level: 'Beginner',
    estimatedDuration: 8, // minutes
  },
  'comprehensive-fraud-schemes': {
    name: 'Comprehensive Fraud Schemes',
    description: 'Advanced multi-layered fraud detection',
    level: 'Advanced',
    estimatedDuration: 12, // minutes
  },
} as const;

export type CourseId = keyof typeof COURSE_INFO;

// Audio file status
export enum AudioFileStatus {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  READY = 'ready',
  ERROR = 'error',
}

// Audio upload progress
export interface AudioUploadProgress {
  courseId: string;
  language: LanguageCode;
  moduleType: 'main' | 'section';
  sectionId?: string;
  progress: number; // 0-100
  status: AudioFileStatus;
  error?: string;
  uploadId: string;
}
