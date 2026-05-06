package products

import "github.com/gin-gonic/gin"

func RegisterRoutes(router *gin.RouterGroup) {
    group := router.Group("/products")
    group.GET("/", HandleProducts)
}
