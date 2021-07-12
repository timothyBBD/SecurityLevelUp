import { User } from '../../models/user';
import { query } from './generic-query-service';
import { userDetails } from './user-details';

export const addUser = async (user: User) => {

    const existingUser = await userDetails(user.getUserName());
    if (existingUser.length > 0) {
        throw new Error('User Already Exists');
    }
    const res = (await query('CALL sp_add_user_and_password(?,?,?,?,?)',
        user.getUserName(),
        user.getIsAdmin(),
        user.getHashedPassword(),
        user.getSalt(),
        user.getEmail()
    ))[0];

    return;
};