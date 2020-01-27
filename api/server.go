package main

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// TimeLog struct
type TimeLog struct {
	ID        uint64    `json:"id"`
	Name      string    `json:"name"`
	Time      int       `json:"time"`
	CreatedAt time.Time `json:"createdAt"`
}

func main() {
	e := echo.New()

	e.Use(middleware.CORS())

	stubData := [3]TimeLog{{
		1,
		"Session 1",
		56245000,
		time.Unix(1579996800, 0),
	},
		{
			2,
			"Session 2",
			1234522,
			time.Unix(1579824000, 0),
		},
		{
			3,
			"Session 3",
			77777754,
			time.Unix(1577836800, 0),
		}}

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello my server!")
	})
	e.GET("/time-logs", func(c echo.Context) error {
		return c.JSON(http.StatusOK, stubData)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
