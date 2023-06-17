# Use an official lightweight Node.js image.
FROM node:alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install

# Copy the rest of the code
COPY . ./

# Build the app
RUN npm run build

# Use an official Nginx image
FROM nginx:alpine as production-stage

# Copy the dist folder from node stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]