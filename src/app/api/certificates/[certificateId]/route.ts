import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Mock database storage for certificates
const certificateStorage = new Map<string, unknown>();

// Certificate data schema
const certificateSchema = z.object({
  id: z.string(),
  userName: z.string(),
  courseName: z.string(),
  totalXP: z.number(),
  moduleCount: z.number(),
  completedModules: z.array(z.object({
    id: z.string(),
    title: z.string(),
    xpEarned: z.number(),
    completedAt: z.string(),
    completed: z.boolean()
  })),
  completionDate: z.string(),
  publicUrl: z.string().optional()
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const { certificateId } = await params;

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    // In a real application, this would query the database
    // For now, we'll use mock storage
    const certificateData = certificateStorage.get(certificateId);

    if (!certificateData) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Validate the stored certificate data
    const certificate = certificateSchema.parse(certificateData);

    // Return certificate data for public viewing
    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate.id,
        userName: certificate.userName,
        courseName: certificate.courseName,
        moduleCount: certificate.moduleCount,
        completedModules: certificate.completedModules,
        completionDate: certificate.completionDate,
        isPublic: true
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const { certificateId } = await params;
    const body = await request.json();

    // Validate the certificate data
    const validatedData = certificateSchema.parse({
      ...body,
      id: certificateId
    });

    // Generate public URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://getclarity.finance';
    const publicUrl = `${baseUrl}/certificates/${certificateId}`;

    const certificateWithPublicUrl = {
      ...validatedData,
      publicUrl,
      createdAt: new Date().toISOString(),
      isPublic: true
    };

    // Store in mock database (in real app, this would be a database operation)
    certificateStorage.set(certificateId, certificateWithPublicUrl);

    return NextResponse.json({
      success: true,
      certificate: certificateWithPublicUrl,
      publicUrl
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid certificate data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
