FROM node:10.13-alpine
# WORKDIR /greenfield
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]