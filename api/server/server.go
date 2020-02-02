package server

import (
	"context"
	"time"

	"github.com/Lisenish/time-tracker-app/api/handler"
	"github.com/Lisenish/time-tracker-app/api/store/mongo"
	"github.com/Lisenish/time-tracker-app/api/usecases"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

//Start : Creates and starts new time log API server
func Start() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	store := mongo.Connect(ctx)

	e := echo.New()

	// For simplicity we just allow any host
	e.Use(middleware.CORS())

	timeLogUseCases := usecases.NewTimeLogUseCases(&store.TimeLogStore)
	handler := handler.New(timeLogUseCases)

	apiPrefix := e.Group("")
	handler.Register(apiPrefix)

	e.Logger.Fatal(e.Start(":1323"))
}
