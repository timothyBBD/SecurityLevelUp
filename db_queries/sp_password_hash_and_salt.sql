CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_password_hash_salt`(IN userName VARCHAR(50)  )
BEGIN
	SELECT password_hash, salt_value FROM simplicity_db.password_salt_view
    WHERE user_name = userName;
END