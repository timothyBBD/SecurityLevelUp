DROP DATABASE IF EXISTS simplicity_db; 
CREATE DATABASE simplicity_db;
USE simplicity_db;

CREATE TABLE users (
	id BINARY(16) PRIMARY KEY,
    user_name VARCHAR(50) CHARACTER SET utf8mb4 UNIQUE,
	admin_user BOOL
);

CREATE TABLE emails (
	id BINARY(16) PRIMARY KEY, 
    email VARCHAR(320) CHARACTER SET utf8mb4 UNIQUE, 
    user_id BINARY(16),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE passwords (
	id BINARY(16) PRIMARY KEY, 
    password_hash BINARY(32), 
    user_id BINARY(16), 
    FOREIGN KEY (user_id) REFERENCES users(id)
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
);

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `simplicity_db`.`blog_posts_view` AS
    SELECT 
        `simplicity_db`.`posts`.`post_title` AS `title`,
        `simplicity_db`.`posts`.`post_body` AS `body`
    FROM
        `simplicity_db`.`posts`;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `simplicity_db`.`password_salt_view` AS
    SELECT 
        CAST(HEX(`simplicity_db`.`salts`.`salt_value`)
            AS CHAR (100) CHARSET UTF8MB4) AS `encryptedSalt`,
        CAST(HEX(`simplicity_db`.`passwords`.`password_hash`)
            AS CHAR (100) CHARSET UTF8MB4) AS `passwordHash`,
        `simplicity_db`.`users`.`id` AS `user_id`
    FROM
        ((`simplicity_db`.`users`
        JOIN `simplicity_db`.`passwords` ON ((`simplicity_db`.`users`.`id` = `simplicity_db`.`passwords`.`user_id`)))
        JOIN `simplicity_db`.`salts` ON ((`simplicity_db`.`passwords`.`id` = `simplicity_db`.`salts`.`password_id`)));

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_blog_post`(IN title VARCHAR(250), IN body TEXT, IN userId BINARY(16) )
BEGIN
	INSERT INTO posts(id, post_title, post_body, user_id)
    VALUES(UUID_TO_BIN(UUID()), title, body, userId);
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user_and_password`(IN userName VARCHAR(50), IN isAdminUser BOOL, IN passwordHash VARCHAR(100), IN passwordSalt VARCHAR(100), IN emailAddress VARCHAR(320))
BEGIN

	DECLARE passwordId BINARY(16); 
    DECLARE binary_password BINARY(32);
	DECLARE binary_salt  VARBINARY(100);
    DECLARE user_id BINARY(16);
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Duplicate key occurred' AS message;
    END;
	DECLARE EXIT HANDLER FOR SQLWARNING
	BEGIN
		ROLLBACK;
		SELECT 'Duplicate key occurred' AS message;
    END;

	START TRANSACTION;
        SET user_id = UUID_TO_BIN(UUID());
		SET binary_password = UNHEX(passwordHash);
		SET binary_salt = UNHEX(passwordSalt);
		SET passwordId = UUID_TO_BIN(UUID());

		INSERT INTO  users(id, user_name, admin_user )
		VALUES (user_id, userName, isAdminUser);
        
        INSERT INTO emails (id, email, user_id)
        VALUES(UUID_TO_BIN(UUID()), emailAddress, user_id);

		INSERT INTO passwords(id, password_hash,  user_id)
		VALUES (passwordId, binary_password, user_id);

		INSERT INTO salts(id, salt_value, password_id)
		VALUES (UUID_TO_BIN(UUID()), binary_salt, passwordId);
	COMMIT;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_password_hash_salt`(IN userId BINARY(16))
BEGIN
	SELECT passwordHash, encryptedSalt FROM simplicity_db.password_salt_view
    WHERE user_id = userId;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_details`(IN userName VARCHAR(50))
BEGIN
	SELECT users.id AS userId, admin_user, email
	FROM users
	INNER JOIN emails ON users.id = emails.user_id
	WHERE users.user_name = userName;
END
