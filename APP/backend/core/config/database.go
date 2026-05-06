package config

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func ConnectDB() {
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		AppConfig.DBHost, AppConfig.DBPort, AppConfig.DBUser, AppConfig.DBPassword, AppConfig.DBName)

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Println("Failed to open database connection:", err)
		DB = nil
		return
	}

	if err = DB.Ping(); err != nil {
		log.Println("Failed to ping database:", err)
		DB = nil
		return
	}

	log.Println("✅ Database connected successfully")
}
