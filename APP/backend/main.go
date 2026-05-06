package main

import (
	"log"

	"LunarCart/APP/backend/core/config"
	"LunarCart/APP/backend/routes"
)

func main() {
	// Load environment variables
	config.LoadEnv()

	// Connect to database
	config.ConnectDB()
	if config.DB != nil {
		defer config.DB.Close()
	}

	// Setup routes
	router := routes.SetupRouter()

	// Start server
	log.Printf("🚀 Server starting on port %s", config.AppConfig.Port)
	if err := router.Run(":" + config.AppConfig.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
