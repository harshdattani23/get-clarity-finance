import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/fraud-protection',
  '/investment-quiz',
  '/awareness(.*)',
  '/api/webhooks/clerk',
  '/api/news',
  '/investment-security-course(.*)',
  '/virtual-trading(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
