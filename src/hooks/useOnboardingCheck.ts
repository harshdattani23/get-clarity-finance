'use client';

import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function useOnboardingCheck() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const recheck = async () => {
    if (!user) return;
    try {
      const token = await getToken();
      const response = await fetch(`/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data && !data.onboarded) {
          setNeedsOnboarding(true);
        } else {
          setNeedsOnboarding(false);
        }
      } else {
        setNeedsOnboarding(true);
      }
    } catch (error) {
      console.error('Failed to check onboarding status', error);
      setNeedsOnboarding(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!user) {
      setIsLoading(false);
      return;
    }
    recheck();
  }, [isLoaded, user]);

  return { isLoading, needsOnboarding, recheck };
}
