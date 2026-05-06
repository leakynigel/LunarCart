package transport

type DeliveryService struct{}

func NewDeliveryService() *DeliveryService {
	return &DeliveryService{}
}

func (s *DeliveryService) Schedule(d Delivery) error {
	return nil
}
