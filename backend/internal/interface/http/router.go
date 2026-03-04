package http

import (
	"example.com/m/internal/infrastructure/env"
	"example.com/m/internal/interface/http/user"
	"example.com/m/internal/interface/http/video"
	"example.com/m/internal/interface/http/video/manager"
	"example.com/m/internal/interface/http/video/viewer"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

func NewRouter(
	uh *user.Handler,
	vmh *manager.VideoManagementHandler,
	vvh *viewer.VideoViewingHandler,
) *echo.Echo {
	secret := env.GetString("SESSION_SECRET", "secret")
	e := echo.New()
	g := e.Group("/api")
	// 共通ミドルウェア設定はここ
	store := sessions.NewCookieStore([]byte(secret))
	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   3600,
		HttpOnly: true,
		Secure:   false,
	}
	e.Use(session.Middleware(store))
	// 各ドメインのルート登録
	user.RegisterRoutes(g, uh)
	video.RegisterRoutes(g, vmh, vvh)

	return e
}
