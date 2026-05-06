package users

import "github.com/gin-gonic/gin"

func HandleUsers(c *gin.Context) {
    c.JSON(200, gin.H{"message": "users endpoint"})
}
