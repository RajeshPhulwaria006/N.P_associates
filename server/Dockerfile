FROM node:20-alpine AS runner

WORKDIR /app

# Install dependencies needed for production
COPY package*.json ./
RUN npm ci --omit=dev

# Copy server application code
COPY src ./src
COPY eslint.config.js ./

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Run API server
CMD ["node", "src/server.js"]
