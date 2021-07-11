import { BinaryLike, createHash } from 'crypto';


export const hashPassword = (password: BinaryLike, salt: BinaryLike) => {

    const hash = createHash(process.env.HASH_ALGORITHM).update(salt).update(password).digest('hex');


    return hash;

};