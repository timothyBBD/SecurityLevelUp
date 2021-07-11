import jwt, { SignCallback, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import { UserJwt } from '../../models/user-jwt-token';

export const createAccessToken = (payload: UserJwt) => {
    if (process.env.JWT_ENCRYPTION_KEY_PATH == undefined) {
        throw new Error("env is wrong")
    }
    const secretKey = fs.readFileSync(process.env.JWT_ENCRYPTION_KEY_PATH);

    const options: SignOptions = {}
    if (process.env.JWT_ALGORITHM != undefined) { algorithm: process.env.JWT_ALGORITHM }
    const token = jwt.sign(payload, secretKey, options);
    return token;
};