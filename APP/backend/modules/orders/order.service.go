package orders

type OrderService struct {
    repo *OrderRepository
}

func NewOrderService(repo *OrderRepository) *OrderService {
    return &OrderService{repo: repo}
}

func (s *OrderService) CreateOrder(order Order) error {
    return nil
}
