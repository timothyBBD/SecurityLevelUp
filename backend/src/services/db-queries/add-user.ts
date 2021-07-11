import { query } from './generic-query-service';
import { userDetails } from './user-details';

export const addUser = async (user: { userName: any; isAdminUser: any; passwordHash: any; encryptedSalt: any; email: any; }) => {

    const existingUser = await userDetails(user.userName);
    if(existingUser.length > 0)
    {
        throw new Error('User Already Exists');
    }
    await query('CALL sp_add_user_and_password(?,?,?,?,?)', user.userName, user.isAdminUser, user.passwordHash, user.encryptedSalt, user.email);

    return;
};