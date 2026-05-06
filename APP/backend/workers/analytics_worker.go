package workers

type AnalyticsWorker struct{}

func NewAnalyticsWorker() *AnalyticsWorker {
	return &AnalyticsWorker{}
}

func (w *AnalyticsWorker) Run() {}
