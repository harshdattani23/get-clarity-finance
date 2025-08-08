#syntax=docker/dockerfile:1.4

# 1. Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# 2. Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time argument for the public key. This is safe as it's a public key.
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ENV NEXT_TELEMETRY_DISABLED=1

# Securely mount the secret key and run the build.
# The secret is never stored in the image layers.
RUN --mount=type=secret,id=clerk_secret_key \
    export CLERK_SECRET_KEY=$(cat /run/secrets/clerk_secret_key) && npm run build

# 3. Final image for production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder stage
COPY --from=builder /app/public ./public

# The standalone output is smaller and contains only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# The `next start` command is replaced by running the server.js file from the standalone output
# CLERK_SECRET_KEY should be provided as an environment variable at runtime, e.g. docker run -e CLERK_SECRET_KEY=...
CMD ["node", "server.js"]
