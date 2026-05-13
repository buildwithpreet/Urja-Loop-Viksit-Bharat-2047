# Use Node.js 20 Alpine for a small footprint
FROM node:20-alpine AS builder

# Set working directory to the app root
WORKDIR /usr/src/app

# Copy backend package files first to leverage Docker cache
COPY backend/package*.json ./backend/
WORKDIR /usr/src/app/backend
RUN npm ci

# Copy the rest of the backend source
COPY backend/ ./
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /usr/src/app/backend

# Copy production dependencies only
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy compiled files from builder stage
COPY --from=builder /usr/src/app/backend/dist ./dist

# Standard Cloud Run environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Cloud Run injects the PORT environment variable
EXPOSE 8080

# Execute the server
CMD ["node", "dist/server.js"]
