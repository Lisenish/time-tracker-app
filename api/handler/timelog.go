package handler

import (
	"net/http"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
	"github.com/labstack/echo/v4"
)

//RegisterTimeLogHandlers : register API endpoints for time log resource
func (h *Handler) registerTimeLogHandlers(group *echo.Group) {
	group.GET("/time-logs", h.listAll)
	group.POST("/time-logs", h.createTimeLog)
}

func (h *Handler) listAll(c echo.Context) error {
	ctx := c.Request().Context()

	fromParam := c.QueryParam("from")

	var from time.Time
	var fromError error
	if fromParam != "" {
		from, fromError = time.Parse(time.RFC3339, fromParam)

		if fromError != nil {
			return echo.NewHTTPError(http.StatusBadRequest, `Please provide valid "from" parameter (YYYY-MM-DD)`)
		}
	} else {
		from = time.Now().UTC().Truncate(time.Hour * 24)
	}

	toParam := c.QueryParam("to")

	//TODO: DRY: move to params checker function
	var to time.Time
	var toError error
	if toParam != "" {
		to, toError = time.Parse(time.RFC3339, toParam)

		if toError != nil {
			return echo.NewHTTPError(http.StatusBadRequest, `Please provide valid "to" parameter (YYYY-MM-DD)`)
		}
	} else {
		to = time.Now().UTC().Truncate(time.Hour * 24)
	}

	//TODO: add params check (max diff)

	timeLogs, err := h.timeLogCases.ListAll(ctx, from, to)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, timeLogs)
}

func (h *Handler) createTimeLog(c echo.Context) error {
	ctx := c.Request().Context()

	timeLog := domain.TimeLog{}

	if err := c.Bind(&timeLog); err != nil {
		return err
	}

	timeLog, err := h.timeLogCases.AddTimeLog(ctx, timeLog)

	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, timeLog)
}
