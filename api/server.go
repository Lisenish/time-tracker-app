package main

import (
	"context"
	"fmt"
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
	ID        primitive.ObjectID `bson:"_id, omitempty"`
	Name      string             `json:"name" bson:"name"`
	Time      int                `json:"time" bson:"time"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

func main() {
	e := echo.New()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
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
		ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		timeLogs := client.Database("trackerDB").Collection("timelogs")

		cursor, err := timeLogs.Find(ctx, bson.D{})
		if err != nil {
			return err
		}

		defer cursor.Close(ctx)

		var result []TimeLog
		cursor.All(ctx, &result)

		if err := cursor.Err(); err != nil {
			log.Fatal(err)
		}

		return c.JSON(http.StatusOK, result)
	})
	e.POST("/time-logs", func(c echo.Context) error {
		timeLog := new(TimeLog)

		if err := c.Bind(timeLog); err != nil {
			return err
		}

		timeLog.CreatedAt = time.Now().UTC()

		fmt.Printf("Got new session name=%v, time=%v, created=%v \n", timeLog.Name, timeLog.Time, timeLog.CreatedAt)

		timeLogs := client.Database("trackerDB").Collection("timelogs")

		result, err := timeLogs.InsertOne(context.Background(), bson.M{"name": timeLog.Name, "time": timeLog.Time, "createdAt": timeLog.CreatedAt}) // move mapping to dto in func
		timeLog.ID = result.InsertedID.(primitive.ObjectID)

		if err != nil {
			return err
		}

		return c.JSON(http.StatusCreated, timeLog)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
