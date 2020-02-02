package mongo

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//Store : Stores collection bounded to mongo
type Store struct {
	TimeLogStore TimeLogStore
}

//Connect : connect to mongo db and return bounded stores
func Connect(ctx context.Context) Store {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI)) //Inline DB address for simplicity

	if err != nil {
		log.Fatal(err)
	}

	return Store{TimeLogStore: TimeLogStore{client}}
}
