package engine

type FraudEngine struct{}

func NewFraudEngine() *FraudEngine {
    return &FraudEngine{}
}

func (e *FraudEngine) EvaluateRisk(orderID string) bool {
    return true
}
