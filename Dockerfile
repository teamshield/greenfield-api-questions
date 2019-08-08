# Stage 1: Building out code
FROM node:10.13-alpine
# WORKDIR /greenfield
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]

# Step 2: This will expose our port 

