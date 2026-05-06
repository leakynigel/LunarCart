package escrow

import "github.com/gin-gonic/gin"

func HandleEscrow(c *gin.Context) {
    c.JSON(200, gin.H{"message": "escrow endpoint"})
}
