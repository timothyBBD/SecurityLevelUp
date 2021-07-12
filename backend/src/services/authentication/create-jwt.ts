import jwt, { SignCallback, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import { UserJwt } from '../../models/user-jwt-token';

export const createAccessToken = (payload: UserJwt) => {
    if (process.env.JWT_ENCRYPTION_KEY_PATH == undefined) {
        throw new Error("env is wrong")
    }
    const secretKey = fs.readFileSync("../"+process.env.JWT_ENCRYPTION_KEY_PATH);

    const options: SignOptions = {expiresIn: "1h"}
    if (process.env.JWT_ALGORITHM != undefined) process.env.JWT_ALGORITHM
    console.log(payload)
    let jwtPayload = Object.assign({}, payload);
    const token = jwt.sign(jwtPayload, secretKey, options);
    return token;
};