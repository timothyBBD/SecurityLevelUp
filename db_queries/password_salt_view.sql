CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `simplicity_db`.`password_salt_view` AS
    SELECT 
        CAST(HEX(`simplicity_db`.`salts`.`salt_value`)
            AS CHAR (100) CHARSET UTF8MB4) AS `encryptedSalt`,
        CAST(HEX(`simplicity_db`.`passwords`.`password_hash`)
            AS CHAR (100) CHARSET UTF8MB4) AS `passwordHash`,
        `simplicity_db`.`users`.`id` AS `user_id`
    FROM
        ((`simplicity_db`.`users`
        JOIN `simplicity_db`.`passwords` ON ((`simplicity_db`.`users`.`id` = `simplicity_db`.`passwords`.`user_id`)))
        JOIN `simplicity_db`.`salts` ON ((`simplicity_db`.`passwords`.`id` = `simplicity_db`.`salts`.`password_id`)))