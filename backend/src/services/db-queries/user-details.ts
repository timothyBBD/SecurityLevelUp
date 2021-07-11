import { query } from './generic-query-service';

export const userDetails = async (userName: string) => {
    const userDetails = (await query('CALL sp_user_details(?)', userName))[0];
    return { ...userDetails[0] };
};