package auth

import (
	"database/sql"
	"fmt"
	"time"

	"LunarCart/APP/backend/core/config"
)

var memoryUsersByEmail = map[string]*User{}
var memoryUsersByID = map[string]*User{}

type AuthRepository struct{}

func (r *AuthRepository) Create(user *User, passwordHash string) error {
	if config.DB == nil {
		user.ID = fmt.Sprintf("user-%d", time.Now().UnixNano())
		user.PasswordHash = passwordHash
		user.IsActive = true
		user.CreatedAt = time.Now()
		user.UpdatedAt = user.CreatedAt
		memoryUsersByEmail[user.Email] = user
		memoryUsersByID[user.ID] = user
		return nil
	}

	query := `INSERT INTO users (id, email, password_hash, first_name, last_name, phone) 
              VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5) 
              RETURNING id, created_at`

	return config.DB.QueryRow(query, user.Email, passwordHash, user.FirstName, user.LastName, user.Phone).
		Scan(&user.ID, &user.CreatedAt)
}

func (r *AuthRepository) FindByEmail(email string) (*User, error) {
	if config.DB == nil {
		user, ok := memoryUsersByEmail[email]
		if !ok {
			return nil, nil
		}
		return user, nil
	}

	user := &User{}
	query := `SELECT id, email, password_hash, first_name, last_name, phone, role, is_active, email_verified 
              FROM users WHERE email = $1`

	err := config.DB.QueryRow(query, email).Scan(
		&user.ID, &user.Email, &user.PasswordHash, &user.FirstName, &user.LastName,
		&user.Phone, &user.Role, &user.IsActive, &user.EmailVerified)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	return user, err
}

func (r *AuthRepository) AssignRole(userID string, roleName string) error {
	if config.DB == nil {
		if user, ok := memoryUsersByID[userID]; ok {
			user.Role = roleName
		}
		return nil
	}

	query := `INSERT INTO user_roles (user_id, role_id) 
              SELECT $1, id FROM roles WHERE name = $2`
	_, err := config.DB.Exec(query, userID, roleName)
	return err
}

func (r *AuthRepository) GetUserRole(userID string) (string, error) {
	if config.DB == nil {
		if user, ok := memoryUsersByID[userID]; ok {
			return user.Role, nil
		}
		return "", nil
	}

	var roleName string
	query := `SELECT r.name FROM roles r 
              JOIN user_roles ur ON r.id = ur.role_id 
              WHERE ur.user_id = $1 LIMIT 1`
	err := config.DB.QueryRow(query, userID).Scan(&roleName)
	return roleName, err
}
