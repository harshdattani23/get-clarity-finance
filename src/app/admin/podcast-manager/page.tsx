import React from 'react';
import { Metadata } from 'next';
import PodcastManagerClient from './PodcastManagerClient';

export const metadata: Metadata = {
  title: 'Podcast Manager - SEBI Verify',
  description: 'Create, manage, and distribute podcasts across multiple languages for investor education',
};

export default function PodcastManagerPage() {
  return <PodcastManagerClient />;
}
