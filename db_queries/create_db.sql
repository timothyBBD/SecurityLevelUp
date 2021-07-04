DROP DATABASE IF EXISTS simplicity_db; 
CREATE DATABASE simplicity_db;
USE simplicity_db;

CREATE TABLE users (
	id BINARY(16) PRIMARY KEY,
    user_name VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE,
	admin_user BOOL DEFAULT false
);

CREATE TABLE emails (
	id BINARY(16) PRIMARY KEY, 
    email VARCHAR(320) CHARACTER SET utf8mb4 UNIQUE, 
    user_id BINARY(16),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE passwords (
	id BINARY(16) PRIMARY KEY, 
    password_hash BINARY(32)
);

CREATE TABLE salts (
	id BINARY(16) PRIMARY KEY, 
    salt_value VARBINARY(100) UNIQUE, 
	password_id BINARY(16),
    FOREIGN KEY (password_id) REFERENCES passwords(id)
);

CREATE TABLE posts (
	id BINARY(16) PRIMARY KEY, 
    post_title VARCHAR(250) CHARACTER SET utf8mb4, 
    post_body TEXT,
	user_id BINARY(16),
	FOREIGN KEY (user_id) REFERENCES users(id)
)
