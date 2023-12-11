# Algolia Solutions Architect Technical Test - Data Ingestion Script

## Description

The Algolia Solutions Architect Technical Test - Data Ingestion Script is a small script written in Go to send data from a JSON file to an Algolia index.

## Usage

1. Make sure you:
    - have cloned the whole algolia-solutions-architect-technical-test repository,
    - are located in the Data Ingestion Script repository from a terminal,
    - have docker installed (https://docs.docker.com/get-docker).

3. The `assets` directory is provided with a JSON file containing a fake dataset. You can replace it with your own.

2. Create a `.env` file from the `.env.example`. Then fill the environment variables accordingly. You will need your Algolia Application ID, Algolia Admin API Key and the index name you want to fill with the data.

        cp .env.example .env

4. Build the image then build, create and start the container in detached mode (container will run in the background).

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script up -d --build

5. Build the script.

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script exec go go build -o bin/data_ingestion_script

6. Run the script. It can take while depending on the size of your file.

        docker-compose -p algolia-solutions-architect-technical-test-data-ingestion-script exec go ./bin/data_ingestion_script
