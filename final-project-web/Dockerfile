# Step 1: Build the React application
FROM node:16 as build

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the Docker image
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the React application from Nginx
FROM nginx:stable-alpine

# Copy the built assets from the build stage to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access the container
EXPOSE 80

# Start Nginx and serve the application
CMD ["nginx", "-g", "daemon off;"]
