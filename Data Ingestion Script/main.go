package main

import (
    "encoding/json"
    "fmt"
    "github.com/algolia/algoliasearch-client-go/v3/algolia/search"
    "github.com/joho/godotenv"
    "log"
    "os"
)

type HierarchicalCategories struct {
    Level0 string `json:"lvl0"`
    Level1 string `json:"lvl1"`
    Level2 string `json:"lvl2"`
    Level3 string `json:"lvl3"`
    Level4 string `json:"lvl4"`
}

type Product struct {
    Brand string `json:"brand"`
    Categories []string `json:"categories"`
    Description string `json:"description"`
    FreeShipping bool `json:"free_shipping"`
    HierarchicalCategories HierarchicalCategories `json:"hierarchicalCategories"`
    Image string `json:"image"`
    Name string `json:"name"`
    ObjectId string `json:"objectID"`
    Popularity int `json:"popularity"`
    Price float64 `json:"price"`
    PriceRange string `json:"price_range"`
    Rating int `json:"rating"`
    Type string `json:"type"`
    Url string `json:"url"`
}

func main() {
    // Load environment variables
    err := godotenv.Load()
    if err != nil {
        log.Fatal(err)
    }

    // Initialize the Algolia search client
    client := search.NewClient(os.Getenv("ALGOLIA_APPLICATION_ID"), os.Getenv("ALGOLIA_APPLICATION_ADMIN_API_KEY"))

    // Intialize the Algolia index
    index := client.InitIndex(os.Getenv("ALGOLIA_INDEX_NAME"))

    // Read the file
    expectedAlgoliaPayload, err := os.ReadFile(os.Getenv("DATASET_FILE_PATH"))
    if err != nil {
        log.Fatal(err)
    }

    var products []Product

    // Parse the JSON-encoded data and stores the result in products
    err = json.Unmarshal([]byte(expectedAlgoliaPayload), &products)
    if err != nil {
        log.Fatal(err)
    }

    // Add new records to the index
    results, err := index.SaveObjects(products)
    if err != nil {
        log.Fatal(err)
    }

    // Print the results
    fmt.Println(results)
}
