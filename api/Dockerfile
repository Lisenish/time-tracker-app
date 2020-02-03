FROM golang:1.13-alpine

COPY . /api/

WORKDIR /api

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o api-server cmd/time_tracker_server/time_tracker_server.go

EXPOSE 1323

CMD ./api-server
