import { createAccessToken, encrypt, hashPassword } from './authentication';
import { addUser } from './db-queries';
import { randomBytes }  from 'crypto';



export const registerUser = async (user) => {

    const storedUser = { ...user };

    const salt = randomBytes(parseInt(process.env.SALT_BYTES, 10)).toString('hex');
    storedUser.passwordHash = hashPassword(user.password, salt);
    storedUser.encryptedSalt = encrypt(salt);

    delete storedUser.password;

    await addUser(storedUser);

    return createAccessToken({ email: user.userName, admin: user.isAdminUser } );

};