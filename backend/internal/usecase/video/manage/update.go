package manage

import (
	"context"
	"time"

	video_value "example.com/m/internal/domain/video/value"
	"github.com/google/uuid"
)

type UpdateResponse struct {
	ID          uuid.UUID
	Title       string
	Description string
	Tags        []string
	Visibility  string
	CreatedAt   time.Time
}

func (uc *VideoManagementUseCase) Update(
	ctx context.Context,
	requesterID uuid.UUID,
	videoID uuid.UUID,
	title string,
	description string,
	tags []string,
	visibility string,
) (*UpdateResponse, error) {
	video, err := uc.VideoRepo.FindByID(ctx, videoID)
	if err != nil {
		return nil, ErrVideoNotFound
	}

	if video.OwnerID() != requesterID {
		return nil, ErrVideoForbidden
	}

	parsedTags := make([]video_value.Tag, len(tags))
	for i, tagStr := range tags {
		tag, err := video_value.NewTag(tagStr)
		if err != nil {
			return nil, err
		}
		parsedTags[i] = tag
	}

	parsedVisibility, err := video_value.NewVisibility(visibility)
	if err != nil {
		return nil, err
	}

	video.UpdateInfo(title, description, parsedTags, parsedVisibility)

	if err := uc.VideoRepo.Save(ctx, video); err != nil {
		return nil, err
	}

	tagsStr := make([]string, len(video.Tags()))
	for i, tag := range video.Tags() {
		tagsStr[i] = string(tag)
	}

	return &UpdateResponse{
		ID:          video.ID(),
		Title:       video.Title(),
		Description: video.Description(),
		Tags:        tagsStr,
		Visibility:  string(video.Visibility()),
		CreatedAt:   video.CreatedAt(),
	}, nil
}
