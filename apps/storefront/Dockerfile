FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/storefront/package.json apps/storefront/
RUN npm install -g pnpm

COPY apps/storefront/. apps/storefront/

RUN pnpm install

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_TOKEN
ARG ARG_SANITY_PROJECT_ID

ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV SANITY_API_TOKEN ${ARG_SANITY_API_TOKEN}

RUN pnpm run build:storefront
RUN pnpm deploy --filter @equinor/storefront --prod foo

# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/apps/storefront/public ./public

# RUN mkdir .next
# RUN chown nextjs:nodejs .next

# COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront/.next/standalone ./apps/storefront
# COPY --from=builder --chown=nextjs:nodejs /app/apps/storefront/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD HOSTNAME="0.0.0.0" node apps/storefront/server.js

