# Stage 1: Build Next.js application
FROM node:20-slim AS builder
WORKDIR /app

# Copy lockfile and package configuration
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build application
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Serve application
FROM node:20-slim
WORKDIR /app

# Copy dependencies and build assets
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose server port
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Start Next.js server
CMD ["npm", "run", "start"]
