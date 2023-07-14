# Name the node stage "builder"
FROM node:16 AS builder
# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
# If you want to install the project
COPY . .

RUN npm install
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html/app

# Copy static assets from builder stage
COPY --from=builder /app/out .

COPY --from=builder /app/bin/results.sh .
RUN chmod 0644 ./results.sh
#Install Cron
# RUN apt-get update
# RUN apt-get -y install cron
# Add the cron job
RUN crontab -l | { cat; echo "* * * * * sh /usr/share/nginx/html/app/results.sh"; } | crontab -
RUN apk add jq

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

