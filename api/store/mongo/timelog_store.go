package mongo

import (
	"context"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//TimeLogStore : store implementation for mongo storage
type TimeLogStore struct {
	client *mongo.Client
}

//Save : save time log to mongo
func (s *TimeLogStore) Save(ctx context.Context, timeLog domain.TimeLog) (domain.TimeLog, error) {
	timeLog.CreatedAt = time.Now().UTC()

	timeLogs := s.client.Database(dbName).Collection(timeLogsCollectionName)

	result, err := timeLogs.InsertOne(ctx, timeLogToBSON(timeLog))
	if err != nil {
		return timeLog, err
	}

	timeLog.ID = result.InsertedID.(primitive.ObjectID)

	return timeLog, nil
}

//ListAllByDates : fetch logs from mongo by date range
func (s *TimeLogStore) ListAllByDates(ctx context.Context, from time.Time, to time.Time) ([]domain.TimeLog, error) {
	timeLogs := s.client.Database(dbName).Collection(timeLogsCollectionName)

	findOptions := options.Find()
	findOptions.SetSort(bson.D{{Key: "createdAt", Value: 1}})

	cursor, err := timeLogs.Find(ctx, bson.D{
		{Key: "createdAt", Value: bson.D{{Key: "$gte", Value: from}}},
		{Key: "createdAt", Value: bson.D{{Key: "$lte", Value: to}}},
	}, findOptions)

	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var result []domain.TimeLog
	cursor.All(ctx, &result)

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	if len(result) == 0 {
		result = []domain.TimeLog{}
	}

	return result, nil
}

func timeLogToBSON(timeLog domain.TimeLog) primitive.M {
	return bson.M{"name": timeLog.Name, "time": timeLog.Time, "createdAt": timeLog.CreatedAt}
}
