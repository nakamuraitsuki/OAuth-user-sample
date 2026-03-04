package middleware

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
)

const SessionName = "session"
const UserIDKey = "user_id"

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sess, err := session.Get(SessionName, c)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Failed to get session")
		}

		val := sess.Values[UserIDKey]
		if val == nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized: no user_id in session")
		}
		id, err := uuid.Parse(val.(string))
		if err != nil {
			return echo.NewHTTPError(http.StatusUnauthorized, "unauthorized: invalid user_id in session")
		}
		SetUserID(c, id)
		return next(c)
	}
}
