CREATE PROCEDURE add_new_user (IN username VARCHAR(50), IN isAdminUser BOOL)
BEGIN
	INSERT INTO simplicity_db.users(id, user_name, admin_user )
	VALUES (UUID_TO_BIN(UUID()), username, isAdminUser);
END
