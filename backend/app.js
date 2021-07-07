
import { encrypt, decrypt, hashPassword } from './services/authentication';
import crypto  from 'crypto';

import { addUser, passwordDetails, userDetails } from './services/db-queries';
import { registerUser } from './services/register-user';




(async function sqlTesting()
{

    const user = {
        email: 'Pig68@temp.com',
        isAdminUser: false,
        password: 'e1cec5b8ba78bac8be3700921d540b0a0e3c339ec6cbf5cae19117e9f5d26b65',
        userName: 'Pig68'
    };

    console.log(await registerUser(user));


    // const token = createAccessToken({ userName, email });
    // const isValid = validateAccessToken(token);
    // console.log(isValid);
    // const uuid = crypto.randomBytes(16);
    // const encrypted = hashPassword(userName ,uuid.toString('hex'));
    // console.log(Buffer.from(encrypted, 'hex').length/2);

})();





