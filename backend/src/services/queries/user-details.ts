import { query } from './generic-query-service';

export const userDetails = async (userName: string) => {
    const userDetails = query('CALL sp_user_details(?)', userName);
    return userDetails;
};