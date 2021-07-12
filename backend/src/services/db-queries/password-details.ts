
import { query } from './generic-query-service';

export const passwordDetails = async (userId: Buffer) => {
    const passwordDetails = (await query('CALL sp_password_hash_salt(?)',  userId))[0][0];
    return { ...passwordDetails };
};

