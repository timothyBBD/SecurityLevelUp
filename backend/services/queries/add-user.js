import { query } from './generic-query-service';
import { userDetails } from './user-details';

export const addUser = async (userName, isAdminUser, passwordHash, encryptedSalt, email) => {

    const user = await userDetails(userName);
    if(user.length > 0)
    {
        throw new Error('User Already Exists');
    }
    await query('CALL sp_add_user_and_password(?,?,?,?,?)', userName, isAdminUser, passwordHash, encryptedSalt, email);

    return;
};