package handler_test

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
	"time"

	"github.com/Lisenish/time-tracker-app/api/domain"
	"github.com/Lisenish/time-tracker-app/api/handler"
	"github.com/Lisenish/time-tracker-app/api/mocks"
	"github.com/Lisenish/time-tracker-app/api/usecases"
	"github.com/golang/mock/gomock"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	createTimeLogJSON  = `{"name":"Test session","time":7000}`
	createdTimeLogJSON = `{"id":"5e0be1003f4fd54062aa8f27","name":"Test session","time":7000,"createdAt":"2020-01-01T00:00:00Z"}`
	timeLogListJSON    = `[{"id":"5e0be1003f4fd54062aa8f27","name":"Test session","time":7000,"createdAt":"2020-01-01T00:00:00Z"},{"id":"5e0be1003f4fd54062aa8f28","name":"Second session","time":60000,"createdAt":"2020-01-02T13:30:00Z"}]`
)

func TestTimeLogCreateHandler(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/time-logs", strings.NewReader(createTimeLogJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	currentTime := time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)
	createdID, _ := primitive.ObjectIDFromHex("5e0be1003f4fd54062aa8f27")
	createdTimeLog := domain.TimeLog{ID: createdID, Name: "Test session", Time: 7000, CreatedAt: currentTime}

	storeMock := mocks.NewMockTimeLogStore(ctrl)
	storeMock.EXPECT().Save(gomock.Any(), domain.TimeLog{Name: "Test session", Time: 7000}).Return(createdTimeLog, nil)

	timeLogUseCases := usecases.NewTimeLogUseCases(storeMock)

	handler := handler.New(timeLogUseCases)
	handler.Register(e.Group(""))

	if assert.NoError(t, handler.CreateTimeLog(c)) {
		assert.Equal(t, http.StatusCreated, rec.Code)
		assert.Equal(t, createdTimeLogJSON, strings.Trim(rec.Body.String(), "\t \n"))
	}
}

func TestTimeLogListByDateHandler(t *testing.T) {
	from := "2020-01-01T00:00:00.000Z"
	to := "2020-02-01T13:25:00.000Z"

	q := make(url.Values)
	q.Set("from", from)
	q.Set("to", to)

	req := httptest.NewRequest(http.MethodGet, "/time-logs?"+q.Encode(), nil)
	rec := httptest.NewRecorder()

	e := echo.New()
	c := e.NewContext(req, rec)

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	firstId, _ := primitive.ObjectIDFromHex("5e0be1003f4fd54062aa8f27")
	secondId, _ := primitive.ObjectIDFromHex("5e0be1003f4fd54062aa8f28")

	firstTimeLog := domain.TimeLog{ID: firstId, Name: "Test session", Time: 7000, CreatedAt: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)}
	secondTimeLog := domain.TimeLog{ID: secondId, Name: "Second session", Time: 60000, CreatedAt: time.Date(2020, 1, 2, 13, 30, 0, 0, time.UTC)}

	storeResponse := []domain.TimeLog{firstTimeLog, secondTimeLog}

	storeMock := mocks.NewMockTimeLogStore(ctrl)
	storeMock.EXPECT().ListAllByDates(gomock.Any(), time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC), time.Date(2020, 2, 1, 13, 25, 0, 0, time.UTC)).Return(storeResponse, nil)

	timeLogUseCases := usecases.NewTimeLogUseCases(storeMock)

	handler := handler.New(timeLogUseCases)
	handler.Register(e.Group(""))

	if assert.NoError(t, handler.ListAll(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, timeLogListJSON, strings.Trim(rec.Body.String(), "\t \n"))
	}
}
