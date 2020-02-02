package handler

import (
	"net/http"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
	"github.com/labstack/echo/v4"
)

//registerTimeLogHandlers : register API endpoints for time log resource
func (h *Handler) registerTimeLogHandlers(group *echo.Group) {
	group.GET("/time-logs", h.ListAll)
	group.POST("/time-logs", h.CreateTimeLog)
}

//ListAll : handler of API list endpoint
func (h *Handler) ListAll(c echo.Context) error {
	ctx := c.Request().Context()

	from, err := parseTimeParam(c, "from", time.Now().UTC().Truncate(time.Hour*24))
	if err != nil {
		return err
	}

	to, err := parseTimeParam(c, "to", time.Now().UTC().Truncate(time.Hour*24))
	if err != nil {
		return err
	}

	//TODO: check max range for safety?

	timeLogs, err := h.timeLogCases.ListAll(ctx, *from, *to)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, timeLogs)
}

//CreateTimeLog : handler of API list endpoint
func (h *Handler) CreateTimeLog(c echo.Context) error {
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

func parseTimeParam(c echo.Context, paramName string, deafultValue time.Time) (*time.Time, error) {
	param := c.QueryParam(paramName)

	var parsedTime time.Time
	var err error

	if param != "" {
		parsedTime, err = time.Parse(time.RFC3339, param)

		if err != nil {
			return nil, echo.NewHTTPError(http.StatusBadRequest, `Please provide valid "`+paramName+`" parameter (YYYY-MM-DD)`)
		}
	} else {
		parsedTime = time.Now().UTC().Truncate(time.Hour * 24)
	}

	return &parsedTime, nil
}
