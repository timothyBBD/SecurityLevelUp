import jwt from 'jsonwebtoken';
import fs from 'fs';
import { UserJwt } from '../../models/user-jwt-token';

export const createAccessToken = (payload: UserJwt) => {
    const secretKey = fs.readFileSync(process.env.JWT_ENCRYPTION_KEY_PATH);
    const token = jwt.sign(payload, secretKey, { algorithm: process.env.JWT_ALGORITHM });
    return token;
};