package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// TimeLog struct
type TimeLog struct {
	ID        primitive.ObjectID `json:"id" bson:"_id, omitempty"`
	Name      string             `json:"name" bson:"name"`
	Time      int                `json:"time" bson:"time"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

func main() {
	e := echo.New()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017")) //Inline DB address for simplicity

	if err != nil {
		log.Fatal(err)
	}

	// For simplicity we just allow any host
	e.Use(middleware.CORS())

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello my server!")
	})

	e.GET("/time-logs", func(c echo.Context) error {
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

		//TODO: DRY: move to checker function
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

		timeLogs := client.Database("trackerDB").Collection("timelogs")

		cursor, err := timeLogs.Find(ctx, bson.D{
			{Key: "createdAt", Value: bson.D{{Key: "$gte", Value: from}}},
			{Key: "createdAt", Value: bson.D{{Key: "$lte", Value: to}}},
		})

		if err != nil {
			return err
		}
		defer cursor.Close(ctx)

		var result []TimeLog
		cursor.All(ctx, &result)

		if err := cursor.Err(); err != nil {
			log.Fatal(err)
		}

		if len(result) == 0 {
			result = []TimeLog{}
		}

		return c.JSON(http.StatusOK, result)
	})

	e.POST("/time-logs", func(c echo.Context) error {
		ctx := c.Request().Context()

		timeLog := new(TimeLog)

		if err := c.Bind(timeLog); err != nil {
			return err
		}
		timeLog.CreatedAt = time.Now().UTC()

		timeLogs := client.Database("trackerDB").Collection("timelogs")

		result, err := timeLogs.InsertOne(ctx, bson.M{"name": timeLog.Name, "time": timeLog.Time, "createdAt": timeLog.CreatedAt}) // move mapping to dto in func
		if err != nil {
			return err
		}

		timeLog.ID = result.InsertedID.(primitive.ObjectID)

		return c.JSON(http.StatusCreated, timeLog)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
