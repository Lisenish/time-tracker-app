package store

import (
	"context"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
)

//TimeLogStore : interface for timelog storage
type TimeLogStore interface {
	Save(ctx context.Context, timelog domain.TimeLog) (domain.TimeLog, error)
	ListAllByDates(ctx context.Context, from time.Time, to time.Time) ([]domain.TimeLog, error)
}
