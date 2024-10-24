# Use an Nginx base image
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy the frontend build into the Nginx directory
COPY . .

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
