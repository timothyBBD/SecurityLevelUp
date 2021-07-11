import { BinaryLike, createHash } from 'crypto';


export const hashPassword = (password: BinaryLike, salt: BinaryLike) => {
    if (process.env.HASH_ALGORITHM == undefined) {
        throw new Error("env is wrong")
    }
    console.log(password)
    const hash = createHash(process.env.HASH_ALGORITHM).update(salt).update(password).digest('hex');
    return hash;
};