package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//TimeLog domain model
type TimeLog struct {
	ID        primitive.ObjectID `json:"id" bson:"_id, omitempty"`
	Name      string             `json:"name" bson:"name"`
	Time      int                `json:"time" bson:"time"`
	CreatedAt time.Time          `json:"createdAt" bson:"createdAt"`
}
