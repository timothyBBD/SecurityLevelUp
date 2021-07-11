import { createAccessToken, encrypt, hashPassword } from '../authentication';
import { addUser, userDetails } from '../db-queries';
import { randomBytes }  from 'crypto';



export const registerUser = async (user) => {

    const storedUser = { ...user };

    const salt = randomBytes(parseInt(process.env.SALT_BYTES, 10)).toString('hex');
    storedUser.passwordHash = hashPassword(user.password, salt);
    storedUser.encryptedSalt = encrypt(salt);

    delete storedUser.password;

    await addUser(storedUser);
    const newUser = await userDetails(storedUser.userName);

    if(Object.keys(newUser).length === 0 && newUser.constructor === Object)
    {
        throw new Error('Failed to add new user, details provided are not valid');
    }

    const accessToken = createAccessToken({ user: user.username, userId: newUser.userId, email: user.email, admin: user.isAdminUser } );

    return { newUser, accessToken };
};