FROM node:10.13-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]