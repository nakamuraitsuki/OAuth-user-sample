package user

import (
	"crypto/rand"
	"encoding/base64"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type DummyLoginResponse struct {
	ID      uuid.UUID `json:"id"`
	Name    string    `json:"name,omitempty"`
	Bio     string    `json:"bio,omitempty"`
	IconKey *string   `json:"icon_key,omitempty"`
	Role    string    `json:"role,omitempty"`
}

func (h *Handler) Login(c echo.Context) error {
	ctx := c.Request().Context()

	state, _ := h.generateRandomString(32)
	nonce, _ := h.generateRandomString(32)

	
}

// state や nonce 等を作るためのヘルパ
func (h *Handler) generateRandomString(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}
