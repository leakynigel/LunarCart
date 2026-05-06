package server

import "github.com/gin-gonic/gin"

func StartServer(addr string, engine *gin.Engine) error {
    return engine.Run(addr)
}
