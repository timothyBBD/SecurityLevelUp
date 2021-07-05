CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_password_salt`(IN userName VARCHAR(50) , OUT passwordSalt VARCHAR(100) )
BEGIN
	SELECT salt_value FROM simplicity_db.password_salt_view
    WHERE user_name = userName
    INTO passwordSalt; 
END