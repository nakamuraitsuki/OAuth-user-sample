package oidc

import "example.com/m/internal/infrastructure/env"

type OIDCConfig struct {
	IssuerURL string
	ClientID string
	ClientSecret string
	RedirectURL string
}

func NewOIDCConfig() *OIDCConfig {
	return &OIDCConfig{
		IssuerURL: env.GetString("OIDC_ISSUER_URL", "127.0.0.2:8080"),
		ClientID: env.GetString("OIDC_CLIENT_ID", "00000000-0000-0000-0000-000000000000"),
		ClientSecret: env.GetString("OIDC_CLIENT_SECRET", "your-client-secret"),
		RedirectURL: env.GetString("OIDC_REDIRECT_URL", "http://localhost/api/callback"),
	}
}