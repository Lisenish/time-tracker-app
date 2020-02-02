package usecases

import (
	"context"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
	"github.com/Lisenish/time-tracker-app/api/store"
)

//TimeLogUseCases : implementation of cases for time logs
type TimeLogUseCases struct {
	store store.TimeLogStore
}

//NewTimeLogUseCases : creates TimeLogUseCases instance
func NewTimeLogUseCases(store store.TimeLogStore) *TimeLogUseCases {
	return &TimeLogUseCases{store}
}

//AddTimeLog : user can save their tracked timelog
func (tl *TimeLogUseCases) AddTimeLog(ctx context.Context, newLog domain.TimeLog) (domain.TimeLog, error) {
	return tl.store.Save(ctx, newLog)
}

//ListAll : user can view saved timelogs by day, week, month
func (tl *TimeLogUseCases) ListAll(ctx context.Context, from time.Time, to time.Time) ([]domain.TimeLog, error) {
	return tl.store.ListAllByDates(ctx, from, to)
}
