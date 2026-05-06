package orders

type OrderRepository struct{}

func NewOrderRepository() *OrderRepository {
    return &OrderRepository{}
}

func (r *OrderRepository) ListOrders() []Order {
    return []Order{}
}
