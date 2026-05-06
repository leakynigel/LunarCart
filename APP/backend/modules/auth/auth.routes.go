package auth

import "github.com/gin-gonic/gin"

func RegisterRoutes(router *gin.RouterGroup) {
	controller := NewAuthController()

	authGroup := router.Group("/auth")
	{
		authGroup.POST("/register", controller.Register)
		authGroup.POST("/login", controller.Login)
	}
}
