package orders

import "github.com/gin-gonic/gin"

func HandleOrders(c *gin.Context) {
    c.JSON(200, gin.H{"message": "orders endpoint"})
}
