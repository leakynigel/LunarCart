package products

type ProductRepository struct{}

func NewProductRepository() *ProductRepository {
    return &ProductRepository{}
}

func (r *ProductRepository) ListProducts() []Product {
    return []Product{}
}
