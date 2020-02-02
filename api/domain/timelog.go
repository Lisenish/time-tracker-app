package domain

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//TimeLog : domain model for timelog
type TimeLog struct {
	ID        primitive.ObjectID `json:"id" bson:"_id, omitempty"`
	Name      string             `json:"name" bson:"name"`
	Time      int                `json:"time" bson:"time"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}

//TimeLogUseCases :  interface describing all use cases one can do with timelogs
type TimeLogUseCases interface {
	AddTimeLog(ctx context.Context, newLog TimeLog) (TimeLog, error)
	ListAll(ctx context.Context, from time.Time, to time.Time) ([]TimeLog, error)
}
