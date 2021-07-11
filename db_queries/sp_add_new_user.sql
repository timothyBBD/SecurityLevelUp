CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_new_user`(IN userName VARCHAR(50), IN isAdminUser BOOL)
BEGIN
	INSERT INTO simplicity_db.users(id, user_name, admin_user )
	VALUES (UUID_TO_BIN(UUID()), userName, isAdminUser);
END