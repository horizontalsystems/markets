FROM node:12-alpine

WORKDIR /app/markets

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3100
