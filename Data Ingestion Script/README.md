# Algolia Solutions Architect Technical Test - Data Ingestion Script

## Description

The Algolia Solutions Architect Technical Test - Data Ingestion Script is a small script written in Go to send data from a JSON file to an Algolia index.

## Installation

1. Make sure you:
    - have cloned the whole algolia-solutions-architect-technical-test repository,
    - are located in the Data Ingestion Script directory from a terminal,
    - have docker installed (https://docs.docker.com/get-docker).

2. The `assets` directory is provided with a JSON file containing a fake dataset. You can replace it with your own.

3. Create a `.env` file from the `.env.example`:

        cp .env.example .env

4. Fill the `.env` with environment variables accordingly. You will need your Algolia Application ID, Algolia Search Only API Key and the index name you want to search from.

4. Build the image then build, create and start the container in detached mode (container will run in the background):

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script up -d --build

5. Build the script:

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script exec go go build -o bin/data_ingestion_script

6. Run the script (it can take while depending on the size of the file):

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script exec go ./bin/data_ingestion_script
