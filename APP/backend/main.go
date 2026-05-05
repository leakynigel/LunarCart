package main

import (
	"fmt"
	"net/http"

	"lunarcart-backend/routes"
)

func main() {
	http.HandleFunc("/api/auth/login", routes.Login)
	http.HandleFunc("/api/auth/register", routes.Register)

	http.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotImplemented)
		w.Write([]byte("Product endpoint not implemented"))
	})
	http.HandleFunc("/api/orders", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNotImplemented)
		w.Write([]byte("Orders endpoint not implemented"))
	})

	fmt.Println("Server running on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
