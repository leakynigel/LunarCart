package escrow

type EscrowService struct{}

func NewEscrowService() *EscrowService {
    return &EscrowService{}
}

func (s *EscrowService) CreateEscrow(e Escrow) error {
    return nil
}
