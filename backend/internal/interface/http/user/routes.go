package user

import (
	"example.com/m/internal/interface/http/middleware"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(g *echo.Group, h *Handler) {
	g.GET("/callback", h.Callback)
	g.GET("/users/login", h.Login)
	g.POST("/users/logout", h.Logout)

	auth := g.Group("/users")
	auth.Use(middleware.DummyAuthMiddleware) // Dummy認証ミドルウェアを適用

	auth.GET("/me", h.GetMe)
	auth.PATCH("/me/profile", h.UpdateProfile)
	auth.PUT("/me/icon", h.UpdateIcon)
}
