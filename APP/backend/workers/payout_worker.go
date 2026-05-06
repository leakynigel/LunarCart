package workers

type PayoutWorker struct{}

func NewPayoutWorker() *PayoutWorker {
	return &PayoutWorker{}
}

func (w *PayoutWorker) Process() {}
