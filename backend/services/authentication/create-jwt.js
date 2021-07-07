import jwt from 'jsonwebtoken';
import fs from 'fs';

export const createAccessToken = (payload) => {
    const secretKey = fs.readFileSync(process.env.JWT_ENCRYPTION_KEY_PATH);
    const token = jwt.sign(payload, secretKey, { algorithm: process.env.JWT_ALGORITHM });
    return token;
};