import jwt from 'jsonwebtoken';
import fs from 'fs';



export const validateAccessToken = (token) => {
    var cert = fs.readFileSync(process.env.JWT_VALIDATION_KEY_PATH);

    try {
        jwt.verify(token, cert, { algorithm: process.env.JWT_ALGORITHM });
        return true;
    } catch(err) {
        return false;
    }
};