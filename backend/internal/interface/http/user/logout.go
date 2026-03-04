package user

import (
	"net/http"

	"example.com/m/internal/interface/http/middleware"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

type LogoutResponse struct {
	Message string `json:"message"`
}

// POST /users/logout
func (h *Handler) Logout(c echo.Context) error {
	// 1. セッションを取得
	sess, _ := session.Get(middleware.SessionName, c)

	// 2. セッションの有効期限を -1 に設定して破棄するように指示
	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   -1, // これでブラウザから削除され、サーバーでも無効とみなされる
		HttpOnly: true,
		Secure:   false, // 本番は true
	}

	// 3. 値をクリア（念のため）
	sess.Values[middleware.UserIDKey] = nil

	// 4. 保存（このタイミングでブラウザに「削除用Cookie」が送られる）
	if err := sess.Save(c.Request(), c.Response()); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to logout")
	}

	return c.JSON(http.StatusOK, LogoutResponse{
		Message: "logout successful",
	})
}
