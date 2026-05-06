package transport

import "github.com/gin-gonic/gin"

func HandleDelivery(c *gin.Context) {
    c.JSON(200, gin.H{"message": "delivery endpoint"})
}
