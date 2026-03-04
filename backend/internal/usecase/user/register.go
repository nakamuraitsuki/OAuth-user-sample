package user

import (
	"context"
	"time"

	"example.com/m/internal/domain/user"
	"example.com/m/internal/domain/user/value"
	"github.com/google/uuid"
)

type RegisterResult struct {
	ID      uuid.UUID
	Name    string
	Bio     string
	IconKey *string
	Role    string
}

func (uc *UserUseCase) Register(
	ctx context.Context,
	idStr string,
	name string,
) (*RegisterResult, error) {
	id, err := uuid.Parse(idStr)
	if err != nil {
		return nil, err
	}

	// べき等性を保つ
	exist, err := uc.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}
	if exist != nil {
		return &RegisterResult{
			ID:      exist.ID(),
			Name:    exist.Name(),
			Bio:     exist.Bio(),
			IconKey: exist.IconKey(),
			Role:    string(exist.Role()),
		}, nil
	}

	user := user.NewUser(
		id,
		name,
		"",
		nil,
		value.RoleUser,
		time.Now(),
	)

	if err := uc.repo.Save(ctx, user); err != nil {
		return nil, err
	}

	return &RegisterResult{
		ID:      user.ID(),
		Name:    user.Name(),
		Bio:     user.Bio(),
		IconKey: user.IconKey(),
		Role:    string(user.Role()),
	}, nil
}
