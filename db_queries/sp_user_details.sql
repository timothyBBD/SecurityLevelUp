CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_user_details`(IN userName VARCHAR(50))
BEGIN
	SELECT users.id, admin_user, email
	FROM users
	INNER JOIN emails ON users.id = emails.user_id
	WHERE users.user_name = userName;
END