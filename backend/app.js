
import { addUser, passwordDetails, userDetails } from './services/queries';




(async function sqlTesting()
{
    const email = 'bob@temp.com',
    isAdmin = true,
    passwordHash = 'C34AB9019CA5A1ED9D4B3FBB689B67CE8191941AF16186D1E0E386D73ADC8741',
    passwordSalt = 'A3EF77A29CA5A1ED9D4B3FBB689B67CE8991942AF56186D3E0E386D73F3C1242',
    userName = 'Josh';


    const { password_hash, salt_value } = await passwordDetails(userName);
    console.log(password_hash);
    console.log(salt_value);
})();





