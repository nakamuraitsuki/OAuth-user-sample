package user

import (
	"example.com/m/internal/infrastructure/auth/oidc"
	user_usecase "example.com/m/internal/usecase/user"
)

type Handler struct {
	oidcConfig *oidc.OIDCConfig
	usecase user_usecase.UserUseCaseInterface
}

func NewHandler(oidcConfig *oidc.OIDCConfig, usecase user_usecase.UserUseCaseInterface) *Handler {
	return &Handler{
		oidcConfig: oidcConfig,
		usecase: usecase,
	}
}
