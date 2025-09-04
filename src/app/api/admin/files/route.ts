import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user info to check if admin
    const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!user.ok) {
      return NextResponse.json({ error: 'Failed to verify admin' }, { status: 403 });
    }

    const userData = await user.json();
    const userEmail = userData.email_addresses?.find((email: any) => email.id === userData.primary_email_address_id)?.email_address;

    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get query parameters for pagination
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Get file metadata with pagination
    const files = await prisma.fileMetadata.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        uploadedAt: 'desc'
      },
      skip: offset,
      take: limit
    });

    // Get file access logs for recent activity
    const recentLogs = await prisma.fileAccessLog.findMany({
      orderBy: {
        accessedAt: 'desc'
      },
      take: 50
    });

    // Get total count for pagination
    const totalFiles = await prisma.fileMetadata.count({
      where: {
        isActive: true
      }
    });

    // Get stats
    const stats = {
      totalFiles,
      totalSize: await prisma.fileMetadata.aggregate({
        _sum: {
          fileSize: true
        },
        where: {
          isActive: true
        }
      }),
      filesThisWeek: await prisma.fileMetadata.count({
        where: {
          isActive: true,
          uploadedAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      filesThisMonth: await prisma.fileMetadata.count({
        where: {
          isActive: true,
          uploadedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      })
    };

    // Group by file type
    const fileTypeStats = await prisma.fileMetadata.groupBy({
      by: ['mimeType'],
      _count: true,
      where: {
        isActive: true
      }
    });

    return NextResponse.json({
      files: files.map(file => ({
        id: file.id,
        fileId: file.fileId,
        originalName: file.originalName,
        fileSize: file.fileSize,
        mimeType: file.mimeType,
        uploadedBy: file.uploadedBy,
        uploadedAt: file.uploadedAt,
        analysisReportId: file.analysisReportId,
        accessLevel: file.accessLevel,
        expiresAt: file.expiresAt
      })),
      recentLogs: recentLogs.map(log => ({
        id: log.id,
        fileId: log.fileId,
        accessedBy: log.accessedBy,
        accessedAt: log.accessedAt,
        accessType: log.accessType
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalFiles / limit),
        totalFiles,
        hasMore: offset + limit < totalFiles
      },
      stats: {
        totalFiles: stats.totalFiles,
        totalSizeMB: Math.round((stats.totalSize._sum.fileSize || 0) / (1024 * 1024) * 100) / 100,
        filesThisWeek: stats.filesThisWeek,
        filesThisMonth: stats.filesThisMonth
      },
      fileTypeStats: fileTypeStats.map(stat => ({
        mimeType: stat.mimeType,
        count: stat._count
      }))
    });

  } catch (error) {
    console.error('Admin files API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
