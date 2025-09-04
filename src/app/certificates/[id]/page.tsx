import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import CertificateDisplay from '@/components/CertificateDisplay';

interface CertificatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  // Extract the certificate ID from the public URL
  const resolvedParams = await params;
  const publicUrlId = resolvedParams.id;
  
  // Find the certificate by public URL
  const certificate = await db.certificate.findFirst({
    where: {
      publicUrl: {
        endsWith: publicUrlId
      }
    },
    include: {
      user: true
    }
  });

  if (!certificate) {
    notFound();
  }

  // Parse and format certificate data for display
  const parsedCertificateData = certificate.certificateData as any;
  const certificateData = {
    id: certificate.id,
    userName: certificate.userName,
    courseName: certificate.courseName,
    completionDate: certificate.completionDate,
    totalXP: certificate.totalXP,
    moduleCount: certificate.moduleCount,
    issuedAt: certificate.issuedAt,
    publicUrl: certificate.publicUrl || undefined,
    completedModules: parsedCertificateData?.completedModules || []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Certificate of Completion
          </h1>
          <p className="text-gray-600">
            This is an official certificate issued by Sebi Verify
          </p>
        </div>
        
        <CertificateDisplay certificateData={certificateData} isPublic={true} />
        
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Certificate Verification
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This certificate can be verified using the following details:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Certificate ID:</span>
                <br />
                <span className="font-mono text-gray-600">{certificate.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Issued Date:</span>
                <br />
                <span className="text-gray-600">
                  {certificate.issuedAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Completion Date:</span>
                <br />
                <span className="text-gray-600">
                  {certificate.completionDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Course:</span>
                <br />
                <span className="text-gray-600">{certificate.courseName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: CertificatePageProps) {
  const resolvedParams = await params;
  const publicUrlId = resolvedParams.id;
  
  const certificate = await db.certificate.findFirst({
    where: {
      publicUrl: {
        endsWith: publicUrlId
      }
    }
  });

  if (!certificate) {
    return {
      title: 'Certificate Not Found',
    };
  }

  return {
    title: `Certificate - ${certificate.userName} - ${certificate.courseName}`,
    description: `Certificate of completion for ${certificate.courseName} awarded to ${certificate.userName}`,
  };
}
