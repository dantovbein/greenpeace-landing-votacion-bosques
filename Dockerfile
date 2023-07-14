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


RUN apt-get update && apt-get -y install cron
COPY results-cron /etc/cron.d/results-cron
RUN chmod 0644 /etc/cron.d/results-cron
RUN touch /var/log/cron.log

COPY --from=builder /app/bin/results.sh .
RUN chmod 0744 ./results.sh

RUN apk add jq

# RUN chmod 0644 ./results.sh
#Install Cron
# RUN apt-get update
# RUN apt-get -y install cron
# Add the cron job
# RUN crontab -l | { cat; echo "* * * * * sh /usr/share/nginx/html/app/results.sh"; } | crontab -

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# https://crontab.guru/every-1-minute
# crontab -l | { cat; echo "* * * * * sh ./results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * sh /results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * sh results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * * root /app/results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * root /app/results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * root /app/results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * sh /app/results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * sh /usr/share/nginx/html/app/results.sh"; } | crontab -
# crontab -l | { cat; echo "* * * * * root /usr/share/nginx/html/app/results.sh"; } | crontab -


# RUN apt-get update && apt-get -y install cron

# # Copy hello-cron file to the cron.d directory
# COPY hello-cron /etc/cron.d/hello-cron
 
# # Give execution rights on the cron job
# RUN chmod 0644 /etc/cron.d/hello-cron

# # Apply cron job
# RUN crontab /etc/cron.d/hello-cron
 
# # Create the log file to be able to run tail
# RUN touch /var/log/cron.log
 
# # Run the command on container startup
# CMD cron && tail -f /var/log/cron.log
