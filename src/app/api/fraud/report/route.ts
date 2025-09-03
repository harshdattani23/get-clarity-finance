import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      entityName,
      registrationClaim,
      fraudType,
      riskScore,
      evidence,
      notes,
      searchQuery,
      searchType,
    } = body;

    // Generate unique report ID
    const reportId = `GC-FR-${nanoid(10).toUpperCase()}`;

    // Create fraud report
    const fraudReport = await prisma.fraudReport.create({
      data: {
        reportId,
        entityName,
        registrationClaim,
        fraudType,
        riskScore: riskScore || 0,
        evidence: evidence || {},
        reportedBy: userId,
        status: "pending",
        sebiReported: false,
        notes,
      },
    });

    // Also log this as a verification if search details provided
    if (searchQuery && searchType) {
      await prisma.verificationLog.create({
        data: {
          searchQuery,
          searchType,
          found: false,
          riskScore,
          legitimacyStatus: "fraudulent",
          intermediaryId: null,
          userAgent: request.headers.get("user-agent"),
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
        },
      });
    }

    return NextResponse.json({
      success: true,
      reportId: fraudReport.reportId,
      message: "Fraud report submitted successfully",
      report: {
        id: fraudReport.id,
        reportId: fraudReport.reportId,
        entityName: fraudReport.entityName,
        fraudType: fraudReport.fraudType,
        status: fraudReport.status,
        createdAt: fraudReport.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating fraud report:", error);
    return NextResponse.json(
      { error: "Failed to create fraud report" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (reportId) {
      // Get specific report
      const report = await prisma.fraudReport.findUnique({
        where: { reportId },
      });

      if (!report) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }

      return NextResponse.json(report);
    } else {
      // Get all reports for the user
      const reports = await prisma.fraudReport.findMany({
        where: { reportedBy: userId },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      return NextResponse.json(reports);
    }
  } catch (error) {
    console.error("Error fetching fraud reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch fraud reports" },
      { status: 500 }
    );
  }
}
