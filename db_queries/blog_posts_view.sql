CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `simplicity_db`.`blog_posts_view` AS
    SELECT 
        `simplicity_db`.`posts`.`post_title` AS `title`,
        `simplicity_db`.`posts`.`post_body` AS `body`
    FROM
        `simplicity_db`.`posts`