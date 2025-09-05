# Audio Upload System Setup Guide

This guide will help you set up the complete audio upload and playback system for your course modules with multi-language support.

## Overview

The system provides:
- **Audio Upload Interface**: Web-based admin panel for uploading audio files
- **Google Cloud Storage Integration**: Secure, scalable file storage
- **Multi-Language Support**: All 11 supported languages
- **Audio Player Components**: Ready-to-use React components for course pages
- **Automated File Organization**: Structured folder system in cloud storage

## File Structure

```
audio/
└── courses/
    ├── intro-to-frauds/
    │   ├── en/
    │   │   ├── main.mp3
    │   │   └── sections/
    │   │       ├── overview.mp3
    │   │       ├── step1.mp3
    │   │       └── simulator.mp3
    │   ├── hi/
    │   │   ├── main.mp3
    │   │   └── sections/...
    │   └── [other languages]/
    └── comprehensive-fraud-schemes/
        ├── en/
        │   ├── main.mp3
        │   └── sections/...
        └── [other languages]/
```

## Prerequisites

1. **Google Cloud Project** with Storage API enabled
2. **Service Account** with Storage Admin permissions
3. **Public Google Cloud Storage Bucket** (already existing: `sebi-verify-public`)

## Setup Steps

### 1. Google Cloud Configuration

#### Create Service Account
```bash
# Create service account
gcloud iam service-accounts create sebi-verify-audio \
    --description="Service account for audio file uploads" \
    --display-name="SEBI Verify Audio Uploader"

# Grant Storage Admin role
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member="serviceAccount:sebi-verify-audio@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

# Create and download key file
gcloud iam service-accounts keys create ./service-account-key.json \
    --iam-account=sebi-verify-audio@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

#### Configure Bucket CORS (if needed)
```bash
# Create cors.json file
echo '[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"],
    "maxAgeSeconds": 3600
  }
]' > cors.json

# Apply CORS configuration
gsutil cors set cors.json gs://sebi-verify-public
```

### 2. Environment Variables

Create or update your `.env.local` file:

```bash
# Copy the example file
cp .env.example .env.local
```

Update with your values:
```env
# Google Cloud Storage Configuration
GOOGLE_CLOUD_PROJECT_ID=your-google-cloud-project-id
GOOGLE_CLOUD_KEY_FILE=./service-account-key.json
GOOGLE_CLOUD_BUCKET_NAME=sebi-verify-public

# Public bucket name for client-side audio URL generation
NEXT_PUBLIC_GOOGLE_CLOUD_BUCKET_NAME=sebi-verify-public
```

### 3. Install Dependencies

The following packages are already included in your project:
- `@google-cloud/storage`: Google Cloud Storage client
- `uuid`: For generating unique upload IDs
- `zod`: For validation schemas

### 4. File Permissions

Ensure the service account key file has proper permissions:
```bash
chmod 600 ./service-account-key.json
```

## Usage Guide

### Admin Interface

1. **Access Upload Manager**
   - Navigate to `/admin/audio-upload`
   - Select course, language, and module type
   - Upload audio files via drag-and-drop or file picker

2. **File Organization**
   - **Main Module Audio**: `main.mp3` in course/language folder
   - **Section Audio**: Named by section ID in `sections/` subfolder
   - **Supported Formats**: MP3, WAV, OGG
   - **File Size Limit**: 50MB

3. **Language Support**
   - English (US): `en`
   - English (India): `en-IN`
   - Hindi: `hi`
   - Bengali: `bn`
   - Kannada: `kn`
   - Marathi: `mr`
   - Telugu: `te`
   - Tamil: `ta`
   - Malayalam: `ml`
   - Gujarati: `gu`
   - Punjabi: `pa`

### Integration in Course Pages

#### Basic Audio Player
```tsx
import CourseAudioPlayer from '@/components/CourseAudioPlayer';
import { useTranslation } from 'react-i18next';

export default function CoursePage() {
  const { i18n } = useTranslation();
  
  return (
    <div>
      <h1>Course Content</h1>
      
      {/* Main course audio */}
      <CourseAudioPlayer
        courseId="intro-to-frauds"
        language={i18n.language as LanguageCode}
        className="mb-6"
      />
      
      {/* Section-specific audio */}
      <CourseAudioPlayer
        courseId="intro-to-frauds"
        language={i18n.language as LanguageCode}
        moduleType="section"
        sectionId="overview"
        showFullControls={false}
        className="mb-4"
      />
    </div>
  );
}
```

#### Using the Hook Directly
```tsx
import useAudioPlayer from '@/hooks/useAudioPlayer';

export default function CustomAudioComponent() {
  const { play, pause, isPlaying, error } = useAudioPlayer({
    courseId: 'comprehensive-fraud-schemes',
    language: 'hi',
    moduleType: 'main',
    onEnded: () => console.log('Audio finished'),
  });
  
  if (error) return <div>Audio not available</div>;
  
  return (
    <button onClick={isPlaying ? pause : play}>
      {isPlaying ? 'Pause' : 'Play'} Audio
    </button>
  );
}
```

## API Reference

### Upload Audio
```http
POST /api/upload-audio
Content-Type: multipart/form-data

Fields:
- audio: Audio file (required)
- courseId: Course identifier (required)
- language: Language code (required)
- moduleType: 'main' | 'section' (required)
- sectionId: Section identifier (required if moduleType='section')
```

### List Audio Files
```http
GET /api/upload-audio?courseId=intro-to-frauds&language=en

Response:
{
  "success": true,
  "files": [...],
  "total": 5
}
```

## File Naming Conventions

### Main Module Audio
- Path: `audio/courses/{courseId}/{language}/main.{extension}`
- Example: `audio/courses/intro-to-frauds/en/main.mp3`

### Section Audio
- Path: `audio/courses/{courseId}/{language}/sections/{sectionId}.{extension}`
- Example: `audio/courses/intro-to-frauds/en/sections/overview.mp3`

### Common Section IDs
- `overview`: Course overview section
- `step1`, `step2`, `step3`, `step4`: Individual steps
- `simulator`: Investigation simulator
- `quiz`: Quiz sections
- `completion`: Course completion

## Troubleshooting

### Common Issues

1. **"Audio file not found" Error**
   - Check if file exists in the correct bucket path
   - Verify file is publicly accessible
   - Ensure correct naming convention

2. **Upload Fails**
   - Verify service account permissions
   - Check file size (max 50MB)
   - Ensure supported file format

3. **CORS Errors**
   - Configure bucket CORS settings
   - Check domain whitelist

4. **Authentication Issues**
   - Verify service account key file path
   - Check environment variables
   - Ensure service account has Storage Admin role

### Debug Commands

```bash
# List bucket contents
gsutil ls -r gs://sebi-verify-public/audio/

# Check file permissions
gsutil acl get gs://sebi-verify-public/audio/courses/intro-to-frauds/en/main.mp3

# Make file public
gsutil acl ch -u AllUsers:R gs://sebi-verify-public/audio/courses/intro-to-frauds/en/main.mp3

# Test file access
curl -I https://storage.googleapis.com/sebi-verify-public/audio/courses/intro-to-frauds/en/main.mp3
```

## Production Considerations

### Security
- Use signed URLs for private audio content
- Implement rate limiting on upload endpoints
- Add user authentication for admin routes

### Performance
- Enable CDN for faster audio delivery
- Implement audio compression for smaller file sizes
- Add audio preloading for better UX

### Monitoring
- Set up bucket usage monitoring
- Track upload success/failure rates
- Monitor audio playback analytics

### Backup
- Enable versioning on the storage bucket
- Set up automated backups
- Implement lifecycle policies for old files

## Integration Examples

### Adding Audio to Existing Course Page

1. **Import Components**
```tsx
import CourseAudioPlayer from '@/components/CourseAudioPlayer';
import { LanguageCode } from '@/lib/models/audio';
```

2. **Get Current Language**
```tsx
const { i18n } = useTranslation();
const currentLanguage = i18n.language as LanguageCode;
```

3. **Add Player to Page**
```tsx
<CourseAudioPlayer
  courseId="intro-to-frauds"
  language={currentLanguage}
  className="mb-6"
/>
```

### Bulk Upload Script

For initial content setup, you can create a bulk upload script:

```javascript
// scripts/bulk-upload-audio.js
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

async function uploadAudioFiles(sourceDir) {
  // Implementation for bulk upload
  // ...
}
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Google Cloud Storage documentation
3. Check the browser console for client-side errors
4. Verify server logs for API errors

This system provides a robust foundation for managing course audio across all your supported languages while maintaining good organization and user experience.
