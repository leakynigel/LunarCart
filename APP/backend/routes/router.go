package routes

import (
	"github.com/gin-gonic/gin"

	"LunarCart/APP/backend/modules/auth"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	// Global CORS middleware
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := router.Group("/api/v1")
	{
		// Register auth routes
		auth.RegisterRoutes(api)
	}

	return router
}
