package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// TimeLog struct
type TimeLog struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Time      int       `json:"time"`
	CreatedAt time.Time `json:"createdAt"`
}

func main() {
	e := echo.New()

	e.Use(middleware.CORS())

	inMemoryTimeLogs := []TimeLog{
		{
			1,
			"Session 1",
			56245000,
			time.Unix(1579996800, 0).UTC(),
		},
		{
			2,
			"Session 2",
			1234522,
			time.Unix(1579824000, 0).UTC(),
		},
		{
			3,
			"Session 3",
			77777754,
			time.Unix(1577836800, 0).UTC(),
		}}

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello my server!")
	})

	e.GET("/time-logs", func(c echo.Context) error {
		return c.JSON(http.StatusOK, inMemoryTimeLogs)
	})
	e.POST("/time-logs", func(c echo.Context) error {
		timeLog := new(TimeLog)

		if err := c.Bind(timeLog); err != nil {
			return err
		}

		fmt.Printf("Got new session name=%v, time=%v \n", timeLog.Name, timeLog.Time)
		inMemoryTimeLogs = append(inMemoryTimeLogs, *timeLog)
		return c.JSON(http.StatusCreated, timeLog)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
