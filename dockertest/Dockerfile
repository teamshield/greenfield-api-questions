# Use and existing docker image as a base

# Base image
# FROM alpine

# DL and I dependency
# apk is a package manager 
# RUN apk add --update redis


# Tell image what to do when it starts as a container
# CMD ["redis-server"]

# FIXME: Modify to fit our application
# CMD [psql -d postgres -U me"]



# TODO: Tutorial Example
# Base image downloaded by docker hub
# FROM alpine

# Run this command
# Looked at image that came from the previous step
# The alpine image was placed in a temp container
# This command was executed in the container as its primary running proess
# It then downloaded redis and redis related dependencies  
# RUN apk add --update redis

# Tell image what to do when it starts as a container
# CMD ["redis-server"]

# From tutorial
# FROM alpine
# RUN npm install
# CMD ["npm", "start"]

# Should work -alpine is just a tag
FROM node:10.13-alpine
# WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
