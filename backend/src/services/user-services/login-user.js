import { createAccessToken, decrypt, hashPassword } from '../authentication';
import { passwordDetails, userDetails } from '../db-queries';


export const loginUser = async (user) => {

    const dbUser = await userDetails(user.userName);
    if(Object.keys(dbUser).length === 0 && user.constructor === Object)
    {
        throw new Error('Failed to login, Invalid User details provided');
    }

    const { passwordHash, encryptedSalt } = await passwordDetails(dbUser.userId);
    const decryptedSalt = decrypt(encryptedSalt);
    const providedPasswordHash = hashPassword(user.password, decryptedSalt);

    if(providedPasswordHash.toLowerCase() !== passwordHash.toLowerCase())
    {
        throw new Error('Failed to login, Invalid User details provided');
    }

    const accessToken = createAccessToken({ user: user.username, userId: dbUser.userId, email: user.email, admin: user.isAdminUser } );
    return accessToken;
};