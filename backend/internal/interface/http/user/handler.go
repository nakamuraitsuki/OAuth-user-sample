package user

import (
	"example.com/m/internal/infrastructure/auth/oidc"
	user_usecase "example.com/m/internal/usecase/user"
)

type Handler struct {
	oidcConfig *oidc.OIDCConfig
	verifier   *oidc.IDTokenVerifier
	usecase    user_usecase.UserUseCaseInterface
}

func NewHandler(oidcConfig *oidc.OIDCConfig, verifier *oidc.IDTokenVerifier, usecase user_usecase.UserUseCaseInterface) *Handler {
	return &Handler{
		oidcConfig: oidcConfig,
		verifier:   verifier,
		usecase:    usecase,
	}
}
