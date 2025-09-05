import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { auth, currentUser } from '@clerk/nextjs/server';

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  // Use keyFilename if provided, otherwise use gcloud auth
  ...(process.env.GOOGLE_CLOUD_KEY_FILE ? { keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE } : {}),
});

const bucketName = process.env.GOOGLE_CLOUD_AUDIO_BUCKET || 'getclarity-audio-bucket';
const bucket = storage.bucket(bucketName);

// Supported languages
const SUPPORTED_LANGUAGES = [
  'en', 'en-IN', 'hi', 'bn', 'kn', 'mr', 'te', 'ta', 'ml', 'gu', 'pa'
];

// Supported courses
const SUPPORTED_COURSES = [
  'introduction',
  'module1',
  'intro-to-frauds',
  'comprehensive-fraud-schemes',
  // Add more courses as needed
];

export async function POST(request: NextRequest) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401 }
    );
  }

  // Check if user is admin
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  if (userEmail !== adminEmail) {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    
    const file = formData.get('audio') as File;
    const courseId = formData.get('courseId') as string;
    const language = formData.get('language') as string;
    const moduleType = formData.get('moduleType') as string; // 'main' or 'section'
    const sectionId = formData.get('sectionId') as string | null; // For section-specific audio
    
    // Validation
    if (!file) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    if (!courseId || !SUPPORTED_COURSES.includes(courseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    if (!language || !SUPPORTED_LANGUAGES.includes(language)) {
      return NextResponse.json(
        { error: 'Invalid language code' },
        { status: 400 }
      );
    }

    if (!moduleType || !['main', 'section'].includes(moduleType)) {
      return NextResponse.json(
        { error: 'Invalid module type. Must be "main" or "section"' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only audio files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 50MB.' },
        { status: 400 }
      );
    }

    // Generate file path based on existing structure
    let filePath: string;
    const fileExtension = file.name.split('.').pop() || 'm4a';
    const timestamp = Date.now();
    
    if (moduleType === 'section' && sectionId) {
      filePath = `lessons/${courseId}/${sectionId}-${language}.${fileExtension}`;
    } else {
      filePath = `lessons/${courseId}/${courseId}-${language}.${fileExtension}`;
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Google Cloud Storage
    const fileUpload = bucket.file(filePath);
    
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          courseId,
          language,
          moduleType,
          sectionId: sectionId || '',
          uploadedAt: new Date().toISOString(),
          uploadId: uuidv4(),
        },
      },
    });

    return new Promise<NextResponse>((resolve) => {
      stream.on('error', (error) => {
        console.error('Upload error:', error);
        resolve(
          NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
          )
        );
      });

      stream.on('finish', async () => {
        try {
          // Make file publicly readable
          await fileUpload.makePublic();
          
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;
          
          // You might want to save this information to your database here
          // await saveAudioRecord({ courseId, language, moduleType, sectionId, publicUrl, filePath });
          
          resolve(
            NextResponse.json({
              success: true,
              message: 'Audio file uploaded successfully',
              data: {
                courseId,
                language,
                moduleType,
                sectionId,
                filePath,
                publicUrl,
                size: file.size,
                type: file.type,
                uploadedAt: new Date().toISOString(),
              },
            })
          );
        } catch (error) {
          console.error('Error making file public:', error);
          resolve(
            NextResponse.json(
              { error: 'File uploaded but failed to make public' },
              { status: 500 }
            )
          );
        }
      });

      stream.end(buffer);
    });

  } catch (error) {
    console.error('Audio upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to list uploaded audio files
export async function GET(request: NextRequest) {
  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401 }
    );
  }

  // Check if user is admin
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  
  if (userEmail !== adminEmail) {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const language = searchParams.get('language');

    let prefix = 'lessons/';
    
    if (courseId) {
      prefix += `${courseId}/`;
    }

    const [files] = await bucket.getFiles({
      prefix,
    });

    const audioFiles = files.map(file => {
      const pathParts = file.name.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const courseId = pathParts[1] || '';
      
      // Extract language from filename (e.g., 'module1-hi.m4a' -> 'hi')
      const fileNameParts = fileName.split('-');
      const langWithExt = fileNameParts[fileNameParts.length - 1] || '';
      const language = langWithExt.split('.')[0] || '';
      
      return {
        name: file.name,
        fileName,
        courseId,
        language,
        publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`,
        size: file.metadata.size,
        contentType: file.metadata.contentType,
        timeCreated: file.metadata.timeCreated,
        updated: file.metadata.updated,
      };
    });

    return NextResponse.json({
      success: true,
      files: audioFiles,
      total: audioFiles.length,
    });

  } catch (error) {
    console.error('Error listing audio files:', error);
    return NextResponse.json(
      { error: 'Failed to list audio files' },
      { status: 500 }
    );
  }
}
