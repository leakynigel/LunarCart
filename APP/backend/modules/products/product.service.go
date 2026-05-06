package products

type ProductService struct {
    repo *ProductRepository
}

func NewProductService(repo *ProductRepository) *ProductService {
    return &ProductService{repo: repo}
}

func (s *ProductService) GetAll() []Product {
    return s.repo.ListProducts()
}
