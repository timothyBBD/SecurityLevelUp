import { User } from '../../models/user';
import { UserJwt } from '../../models/user-jwt-token';
import { UserLogin } from '../../models/user-login';
import { createAccessToken, decrypt, hashPassword } from '../authentication';
import { passwordDetails, userDetails } from '../db-queries';


export const loginUser = async (user: UserLogin) => {

    const dbUser = await userDetails(user.getUserName());
    console.log(dbUser);
    if(Object.keys(dbUser).length === 0 && user.constructor === Object)
    {
        throw new Error('Failed to login, Invalid User details provided');
    }
    
    const { passwordHash, encryptedSalt } = await passwordDetails(dbUser.userId);
    console.log(encryptedSalt)
    const decryptedSalt = decrypt(encryptedSalt);
    const providedPasswordHash = hashPassword(user.getPassword(), decryptedSalt);

    if(providedPasswordHash.toLowerCase() !== passwordHash.toLowerCase())
    {
        throw new Error('Failed to login, Invalid User details provided');
    }

    const accessToken = createAccessToken(new UserJwt(user.getUserName(), dbUser[0].email, dbUser[0].admin) );
    return accessToken;
};