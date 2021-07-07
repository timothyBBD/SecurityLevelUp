
import { createAccessToken, encrypt, decrypt, validateAccessToken } from './services/authentication';
import crypto  from 'crypto';

import { addUser, passwordDetails, userDetails } from './services/db-queries';




(async function sqlTesting()
{
    const email = 'bob@temp.com',
    isAdmin = true,
    passwordHash = 'C34AB9019CA5A1ED9D4B3FBB689B67CE8191941AF16186D1E0E386D73ADC8741',
    passwordSalt = 'A3EF77A29CA5A1ED9D4B3FBB689B67CE8991942AF56186D3E0E386D73F3C1242',
    userName = 'Josh';


    // const token = createAccessToken({ userName, email });
    // const isValid = validateAccessToken(token);
    // console.log(isValid);
    const uuid = crypto.randomBytes(16);
    const encrypted = encrypt(uuid);
    const decrypted = decrypt(encrypted);
    console.log(uuid.toString('hex'));
    console.log(encrypted);
    console.log(decrypted);

})();





