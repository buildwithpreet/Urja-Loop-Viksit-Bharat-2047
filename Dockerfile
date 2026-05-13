# Use a more robust Node.js image to avoid Alpine-specific build issues
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy backend package files from the backend subdirectory
# Cloud Build runs from the root context
COPY backend/package*.json ./
RUN npm ci

# Copy the rest of the backend source code
COPY backend/ ./

# Build the project (runs tsc)
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

# Copy production dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy compiled files from the builder stage
COPY --from=builder /app/dist ./dist

# Standard Cloud Run environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Cloud Run injects the PORT environment variable
EXPOSE 8080

# Start the server
CMD ["node", "dist/server.js"]
