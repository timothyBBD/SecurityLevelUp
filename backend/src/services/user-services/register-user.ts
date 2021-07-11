import { createAccessToken, encrypt, hashPassword } from '../authentication';
import { addUser, userDetails } from '../db-queries';
import { User } from '../../models/user';
import { UserJwt } from '../../models/user-jwt-token';



export const registerUser = async (user: User) => {

    await addUser(user);
    const dbUser = await userDetails(user.getUserName());

    if (Object.keys(dbUser).length === 0 && dbUser.constructor === Object)
    {
        throw new Error('Failed to add new user, details provided are not valid');
    }

    const accessToken = createAccessToken(new UserJwt(dbUser[0].id, dbUser[0].name, dbUser[0].email, dbUser[0].admin));

    return { dbUser, accessToken };
};