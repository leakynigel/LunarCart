package admin

type AdminService struct{}

func NewAdminService() *AdminService {
    return &AdminService{}
}

func (s *AdminService) Audit() error {
    return nil
}
