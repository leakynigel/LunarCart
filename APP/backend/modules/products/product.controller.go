package products

import "github.com/gin-gonic/gin"

func HandleProducts(c *gin.Context) {
    c.JSON(200, gin.H{"message": "products endpoint"})
}
