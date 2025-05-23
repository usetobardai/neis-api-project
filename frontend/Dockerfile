# Stage 1: Build the React application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from the builder stage
COPY --from=builder /app/build .

# Expose port 80
EXPOSE 80

# Nginx will start automatically, but an explicit CMD can be useful for clarity or customization
CMD ["nginx", "-g", "daemon off;"]
