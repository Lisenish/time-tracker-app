package mongo

const (
	//Inlined for simplicity, but potentially we can get this connection sting from env
	mongoURI = "mongodb://mongo:27017"

	dbName                 = "trackerDB"
	timeLogsCollectionName = "timelogs"
)
