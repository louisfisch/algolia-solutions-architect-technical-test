FROM node:lts-bullseye-slim

# Create an app directory to hold the app’s source code
WORKDIR /app

COPY package*.json .

# Install npm dependencies
RUN npm install

# Copy everything from root directory into app directory
COPY . .
