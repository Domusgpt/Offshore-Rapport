FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Configure nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]