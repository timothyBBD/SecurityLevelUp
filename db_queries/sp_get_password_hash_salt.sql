CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_password_hash_salt`(IN userId BINARY(16))
BEGIN
	SELECT passwordHash, encryptedSalt FROM simplicity_db.password_salt_view
    WHERE user_id = userId;
END