import { createHash } from 'crypto';


export const hashPassword = (password, salt) => {

    const hash = createHash(process.env.HASH_ALGORITHM).update(salt).update(password).digest('hex');


    return hash;

};