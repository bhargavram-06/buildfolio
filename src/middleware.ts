import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are completely public (Landing page, API paths, Public user portfolios)
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/github(.*)",
  "/api/portfolio(.*)",
  "/:slug(.*)"
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|png|jpg|jpeg|webp|woff|woff2|ico|csv|docx|xlsx|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};