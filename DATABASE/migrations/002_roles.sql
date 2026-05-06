-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]'
);

-- User roles junction
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Insert default roles
INSERT INTO roles (name, description, permissions) VALUES
('buyer', 'Can browse and purchase products', '["view_products", "create_orders", "view_own_orders"]'),
('seller', 'Can manage products and view sales', '["view_products", "create_products", "edit_products", "view_sales", "manage_inventory"]'),
('admin', 'Full system access', '["*"]'),
('super_admin', 'Complete system control', '["*"]');

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);