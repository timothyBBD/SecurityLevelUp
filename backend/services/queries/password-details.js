
import { query } from './generic-query-service';

export const passwordDetails = async (userName) => {
    const passwordDetails = await query('CALL sp_password_hash_salt(?)',  userName);
    return passwordDetails[0];
};

