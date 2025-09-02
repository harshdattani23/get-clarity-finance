import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const ADMIN_EMAIL = 'dattaniharsh12@gmail.com';

export async function isAdmin() {
  const user = await currentUser();
  
  if (!user) {
    return false;
  }
  
  // Check if the user's primary email matches admin email
  const userEmail = user.emailAddresses?.find(
    email => email.id === user.primaryEmailAddressId
  )?.emailAddress;
  
  return userEmail === ADMIN_EMAIL;
}

export async function requireAdmin() {
  const adminStatus = await isAdmin();
  
  if (!adminStatus) {
    return new NextResponse('Unauthorized - Admin access required', { status: 403 });
  }
  
  return null;
}
