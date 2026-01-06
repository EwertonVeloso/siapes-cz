FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies (including dev for TS tooling)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy application source
COPY . .

# Generate Prisma client if schema exists
RUN npx prisma generate --schema=./prisma/schema.prisma || true

# Expose app port
EXPOSE 3000
ENV PORT=3000

# Run using tsx so we can run TypeScript directly
CMD ["npx", "tsx", "src/server.ts"]
