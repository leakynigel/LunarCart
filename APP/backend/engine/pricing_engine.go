package engine

type PricingEngine struct{}

func NewPricingEngine() *PricingEngine {
    return &PricingEngine{}
}

func (e *PricingEngine) CalculatePrice(base float64) float64 {
    return base
}
