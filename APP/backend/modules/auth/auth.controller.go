package auth

import (
	"github.com/gin-gonic/gin"

	"LunarCart/APP/backend/core/utils"
	"LunarCart/APP/backend/shared/dto"
)

type AuthController struct {
	service *AuthService
}

func NewAuthController() *AuthController {
	return &AuthController{
		service: NewAuthService(),
	}
}

func (ctrl *AuthController) Register(c *gin.Context) {
	var req dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	user, err := ctrl.service.Register(req)
	if err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	utils.Success(c, 201, "User registered successfully", user)
}

func (ctrl *AuthController) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.Error(c, 400, err.Error())
		return
	}

	response, err := ctrl.service.Login(req)
	if err != nil {
		utils.Error(c, 401, err.Error())
		return
	}

	utils.Success(c, 200, "Login successful", response)
}
