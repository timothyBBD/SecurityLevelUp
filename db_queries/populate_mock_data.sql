




create TABLE debug(
	testValueBin VARBINARY(300), 
    testValueText VARCHAR(300)
    
)



-- CALL add_new_user("admin", true)

-- INSERT INTO simplicity_db.users(id, user_name, admin_user )
-- VALUES
-- 	(UUID_TO_BIN(UUID()), 'Denisarex', true),
-- 	(UUID_TO_BIN(UUID()), 'Disguised Monkey', false), 
-- 	(UUID_TO_BIN(UUID()), 'MindOfHelge', false), 
-- 	(UUID_TO_BIN(UUID()), 'H3lg3', true);
-- SELECT user_name from users
-- 

-- 	CALL sp_add_new_user(userName, isAdminUser); 

-- 	INSERT INTO simplicity_db.passwords(id, password_hash, admin_user )
-- 	VALUES (passwordId, binary_password, (SELECT user_name FROM users WHERE user_name = userName));

-- 	INSERT INTO simplicity_db.salts(id, salt_value, password_id)
-- 	VALUES (UUID_TO_BIN(UUID()), binary_salt, passwordId);