CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_blog_post`(IN title VARCHAR(250), IN body TEXT, IN userId BINARY(16) )
BEGIN
	INSERT INTO posts(id, post_title, post_body, user_id)
    VALUES(UUID_TO_BIN(UUID()), title, body, userId);
END