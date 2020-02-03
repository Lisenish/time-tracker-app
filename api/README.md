This is an API Back-end for the time-tracking application.

## How to Run

### App
- `go run cmd/time_tracker_server/time_tracker_server.go`
- or with use docker-compose (see root Readme)

### Tests
- `go test ./...`

## Available Endpoints

`GET /time-logs[?from=date&to=date]` - list of time logs filtered by date. Default filter is today

`POST /time-logs` - save new time log
