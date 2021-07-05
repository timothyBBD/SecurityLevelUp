CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `simplicity_db`.`password_salt_view` AS
    SELECT 
        HEX(`simplicity_db`.`salts`.`salt_value`) AS `salt_value`,
        HEX(`simplicity_db`.`passwords`.`password_hash`) AS `password_hash`,
        `simplicity_db`.`users`.`user_name` AS `user_name`
    FROM
        ((`simplicity_db`.`users`
        JOIN `simplicity_db`.`passwords` ON ((`simplicity_db`.`users`.`id` = `simplicity_db`.`passwords`.`user_id`)))
        JOIN `simplicity_db`.`salts` ON ((`simplicity_db`.`passwords`.`id` = `simplicity_db`.`salts`.`password_id`)))