CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user_and_password`(IN userName VARCHAR(50), IN isAdminUser BOOL, IN passwordHash VARCHAR(100), IN passwordSalt VARCHAR(100), IN emailAddress VARCHAR(320))
BEGIN

	DECLARE passwordId BINARY(16); 
    DECLARE binary_password BINARY(32);
	DECLARE binary_salt  VARBINARY(100);
    DECLARE user_id BINARY(16);
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
	DECLARE EXIT HANDLER FOR SQLWARNING ROLLBACK;
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