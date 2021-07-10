import { query } from './generic-query-service';

export const userDetails = async (userName) => {
    const userDetails = await query('CALL sp_user_details(?)', userName);
    return { ...userDetails[0] };
};