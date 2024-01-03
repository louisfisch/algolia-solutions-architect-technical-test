FROM node:lts-bullseye-slim

# Create a directory to hold the app’s source code
WORKDIR /usr/src/app

# Copy package.json and package-lock.json in the /usr/src/app directory
COPY package*.json .

# Install npm dependencies
RUN npm install

# Run the application
CMD ["npm", "start"]
