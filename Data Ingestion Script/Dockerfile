FROM golang:1.21-bullseye

# Create an app directory to hold the app’s source code
WORKDIR /app

# Copy everything from root directory into app directory
COPY . .

# Install Go dependencies
RUN go mod download

# Build the app
RUN go build -o /godocker

# Tell Docker which network port the container listens on
EXPOSE 8080
