
import { encrypt, decrypt, hashPassword } from './services/authentication';
import crypto  from 'crypto';

import { addUser, passwordDetails, userDetails } from './services/db-queries';
import { loginUser } from './services/user-services';




(async function sqlTesting()
{

    try {

        const user = {
            email: 'Pig68@temp.com',
            isAdminUser: false,
            password: 'e1cec5b8ba78bac8be3700921d540b0a0e3c339ec6cbf5cae19117e9f5d26b65',
            userName: 'Pig69'
        };
        const accessToken  =  await loginUser(user);
        console.log(accessToken);
    }
    catch (err)
    {
        console.log(err);
    }


})();





