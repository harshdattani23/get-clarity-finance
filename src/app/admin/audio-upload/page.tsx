"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import AudioUploadManager from '@/components/AudioUploadManager';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export default function AudioUploadPage() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router]);

  useEffect(() => {
    if (user) {
      const userEmail = user.emailAddresses.find(
        (email) => email.id === user.primaryEmailAddressId
      )?.emailAddress;

      if (userEmail !== ADMIN_EMAIL) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
  }, [user, router]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AudioUploadManager
      onUploadComplete={(audioFile) => {
        console.log('Audio file uploaded successfully:', audioFile);
        // You can add additional logic here, such as:
        // - Showing a success notification
        // - Updating a global state
        // - Logging analytics
      }}
    />
  );
}
