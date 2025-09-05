import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  const user = await currentUser();
  
  // Check if user is authenticated and is the admin
  if (!userId || !user) {
    redirect('/sign-in');
  }
  
  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  if (userEmail !== ADMIN_EMAIL) {
    redirect('/?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Restricted Access
              </span>
            </div>
            <div className="text-sm text-gray-500">
              User ID: {userId?.slice(0, 8)}...
            </div>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 py-4">
            <a
              href="/admin/audio-upload"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Audio Upload
            </a>
            {/* Add more admin navigation items here */}
          </nav>
        </div>
      </div>

      {/* Admin Content */}
      <div className="py-8">
        {children}
      </div>
    </div>
  );
}
