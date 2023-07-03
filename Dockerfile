# Name the node stage "builder"
FROM node:16 AS builder
# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
# If you want to install the project
COPY . .

RUN npm run build
# RUN npm install --location=global npm@8.15.0
# RUN npm install --location=global typescript
# RUN npm install --location=global react-scripts
# RUN npm install --legacy-peer-deps
# RUN npm run types
# RUN npm run client:build:production

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html/app

# Copy static assets from builder stage
COPY --from=builder /app/out .

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
