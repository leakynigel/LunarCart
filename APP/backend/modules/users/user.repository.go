package users

type UserRepository struct{}

func NewUserRepository() *UserRepository {
	return &UserRepository{}
}

func (r *UserRepository) FindUser(id string) (User, error) {
	return User{}, nil
}
