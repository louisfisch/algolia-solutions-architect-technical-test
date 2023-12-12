#  Algolia Solutions Architect Technical Test - UI

## Description

The Algolia Solutions Architect Technical Test - UI Script is a demo web application to display and filter records from an Algolia index.

## Installation

### CodeSandbox

https://codesandbox.io/p/devbox/algolia-solutions-architect-technical-test-ui-fqqd7g

### Locally

1. Make sure you:
    - have cloned the whole algolia-solutions-architect-technical-test repository,
    - are located in the UI directory from a terminal,
    - have docker installed (https://docs.docker.com/get-docker).

2. Create a `.env` file from the `.env.example`:

        cp .env.example .env

3. Fill the `.env` with environment variables accordingly. You will need your Algolia Application ID, Algolia Search Only API Key and the index name you want to search from.

4. Build the image then build, create and start the container in detached mode (container will run in the background):

        docker-compose -p algolia-solutions-architect-technical-test-data-ui up -d --build

5. Build the application:

        docker-compose -p algolia-solutions-architect-technical-test-data-ui exec nodejs npm start

6. Open your browser and visit http://localhost:3000
