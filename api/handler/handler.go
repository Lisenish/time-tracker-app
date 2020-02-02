package handler

import (
	"github.com/Lisenish/time-tracker-app/api/domain"
	"github.com/labstack/echo/v4"
)

//Handler : API reqest handler
type Handler struct {
	timeLogCases domain.TimeLogUseCases
}

//New : creates new API reqest handler
func New(tl domain.TimeLogUseCases) *Handler {
	return &Handler{timeLogCases: tl}
}

//Register : register all API endpoints
func (h *Handler) Register(group *echo.Group) {
	h.registerTimeLogHandlers(group)
}
