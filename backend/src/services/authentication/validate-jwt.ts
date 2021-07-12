import jwt, { Algorithm } from 'jsonwebtoken';
import fs from 'fs';

export const validateAccessToken = (token: any) => {
    if (process.env.JWT_VALIDATION_KEY_PATH == undefined) {
        throw new Error("env is wrong")
    }
    var cert = fs.readFileSync(process.env.JWT_VALIDATION_KEY_PATH);
    var algo: Algorithm[] = []
    if (process.env.JWT_ALGORITHM != undefined && typeof process.env.JWT_ALGORITHM != "string")
        algo.push(process.env.JWT_ALGORITHM)
    try {
        const decodedJwt = jwt.verify(token, cert, { algorithms: algo });

        decodedJwt.payload.isAdmin

        return decodedJwt;
    } catch (err) {
        return false;
    }
};