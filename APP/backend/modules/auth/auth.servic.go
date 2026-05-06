package auth

import (
	"errors"

	"golang.org/x/crypto/bcrypt"

	"LunarCart/APP/backend/core/utils"
	"LunarCart/APP/backend/shared/dto"
)

type AuthService struct {
	repo *AuthRepository
}

func NewAuthService() *AuthService {
	return &AuthService{
		repo: &AuthRepository{},
	}
}

func (s *AuthService) Register(req dto.RegisterRequest) (*dto.UserResponse, error) {
	// Check if user exists
	existingUser, _ := s.repo.FindByEmail(req.Email)
	if existingUser != nil {
		return nil, errors.New("user already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Set default role
	role := req.Role
	if role == "" {
		role = "buyer"
	}

	// Create user
	user := &User{
		Email:     req.Email,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Phone:     req.Phone,
	}

	if err := s.repo.Create(user, string(hashedPassword)); err != nil {
		return nil, err
	}

	// Assign role
	if err := s.repo.AssignRole(user.ID, role); err != nil {
		return nil, err
	}

	return &dto.UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Phone:     user.Phone,
		Role:      role,
	}, nil
}

func (s *AuthService) Login(req dto.LoginRequest) (*dto.LoginResponse, error) {
	user, err := s.repo.FindByEmail(req.Email)
	if err != nil || user == nil {
		return nil, errors.New("invalid credentials")
	}

	if !user.IsActive {
		return nil, errors.New("account is deactivated")
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, errors.New("invalid credentials")
	}

	// Get user role
	role, err := s.repo.GetUserRole(user.ID)
	if err != nil {
		role = "buyer" // default role
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		Token: token,
		User: dto.UserResponse{
			ID:        user.ID,
			Email:     user.Email,
			FirstName: user.FirstName,
			LastName:  user.LastName,
			Phone:     user.Phone,
			Role:      role,
		},
	}, nil
}
