
import { encrypt, decrypt, hashPassword, validateAccessToken } from './services/authentication';
import crypto  from 'crypto';

import { addUser, passwordDetails, userDetails } from './services/db-queries';
import { loginUser, registerUser } from './services/user-services';
import { addBlogPost, getBlogPosts } from './services/db-queries/blog-posts';




(async function sqlTesting()
{

    try {

        const user = {
            email: 'Pig70@temp.com',
            isAdminUser: true,
            password: 'e1cec5b8ba78bac8be3700921d540b0a0e3c339ec6cbf5cae19117e9f5d26b69',
            userName: 'Pig70'
        };
        const registeredUser = await registerUser(user);
        console.log(registerUser);
        console.log(validateAccessToken(registeredUser.accessToken));
        const accessToken = await loginUser(user);
        console.log(accessToken);
        console.log(validateAccessToken(accessToken));

    }
    catch (err)
    {
        console.log(err);
    }


})();





