import jwt from 'jsonwebtoken';
import fs from 'fs';

export const validateAccessToken = (token) => {
    var cert = fs.readFileSync(process.env.JWT_VALIDATION_KEY_PATH);

    try {
        const decodedJwt = jwt.verify(token, cert, { algorithm: process.env.JWT_ALGORITHM });
        return decodedJwt;
    } catch(err) {
        return false;
    }
};