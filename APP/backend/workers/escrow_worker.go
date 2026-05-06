package workers

type EscrowWorker struct{}

func NewEscrowWorker() *EscrowWorker {
	return &EscrowWorker{}
}

func (w *EscrowWorker) Start() {}
