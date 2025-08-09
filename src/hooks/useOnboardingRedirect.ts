'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useOnboardingRedirect() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!user) {
      setIsChecking(false);
      return;
    }

    const checkOnboardingStatus = async () => {
      try {
        const res = await fetch(`/api/user/${user.id}`);
        if (res.ok) {
          const profile = await res.json();
          if (!profile.onboarded) {
            router.push('/onboarding');
          } else {
            setIsChecking(false);
          }
        } else {
          // Failed to fetch profile, stop checking
          setIsChecking(false);
        }
      } catch (error) {
        console.error('Failed to check onboarding status', error);
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [user, isLoaded, router]);

  return { isCheckingOnboarding: isChecking };
}
