package manager

import (
	"errors"
	"net/http"

	"example.com/m/internal/interface/http/middleware"
	"example.com/m/internal/usecase/video/manage"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UpdateVideoRequest struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Visibility  string   `json:"visibility"`
}

type UpdateVideoResponse struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Visibility  string   `json:"visibility"`
	CreatedAt   string   `json:"created_at"`
}

func (h *VideoManagementHandler) Update(c echo.Context) error {
	ctx := c.Request().Context()

	videoIDStr := c.Param("id")
	videoID, err := uuid.Parse(videoIDStr)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid video ID: "+err.Error())
	}

	userID, err := middleware.GetUserID(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err.Error())
	}

	var req UpdateVideoRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	result, err := h.manageUsecase.Update(ctx, userID, videoID, req.Title, req.Description, req.Tags, req.Visibility)
	if err != nil {
		switch {
		case errors.Is(err, manage.ErrVideoNotFound):
			return echo.NewHTTPError(http.StatusNotFound, err.Error())
		case errors.Is(err, manage.ErrVideoForbidden):
			return echo.NewHTTPError(http.StatusForbidden, err.Error())
		default:
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	resp := UpdateVideoResponse{
		ID:          result.ID.String(),
		Title:       result.Title,
		Description: result.Description,
		Tags:        result.Tags,
		Visibility:  result.Visibility,
		CreatedAt:   result.CreatedAt.Format("2006-01-02T15:04:05Z07:00"),
	}

	return c.JSON(http.StatusOK, resp)
}
