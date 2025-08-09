'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

// Define the types based on your Prisma schema
interface CourseProgress {
  courseId: string;
  lessonId: string;
  status: string;
  completedAt: string | null;
}

interface VirtualPortfolio {
  ticker: string;
  quantity: number;
  averagePrice: number;
}

interface UserProfile {
  username: string;
  email: string;
  investmentExperience: string;
  courseProgress: CourseProgress[];
  virtualPortfolio: VirtualPortfolio[];
}

export default function ProfilePage() {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const res = await fetch(`/api/user/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setUserProfile(data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userProfile) {
    return <div>Could not load user profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Username:</strong> {userProfile.username || 'Not set'}</p>
      <p><strong>Email:</strong> {userProfile.email}</p>
      <p><strong>Investment Experience:</strong> {userProfile.investmentExperience || 'Not set'}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Course Progress</h2>
        {userProfile.courseProgress.length > 0 ? (
          <ul>
            {userProfile.courseProgress.map((course) => (
              <li key={`${course.courseId}-${course.lessonId}`}>
                {course.courseId} - {course.lessonId}: {course.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No course progress yet.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Virtual Portfolio</h2>
        {userProfile.virtualPortfolio.length > 0 ? (
          <ul>
            {userProfile.virtualPortfolio.map((stock) => (
              <li key={stock.ticker}>
                {stock.ticker}: {stock.quantity} shares @ ${stock.averagePrice}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your portfolio is empty.</p>
        )}
      </div>
    </div>
  );
}

