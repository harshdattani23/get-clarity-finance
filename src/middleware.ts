import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/fraud-protection",
    "/investment-quiz",
    "/awareness(.*)",
    "/api/webhooks/clerk"
  ]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
