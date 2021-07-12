import jwt, { Algorithm } from 'jsonwebtoken';
import fs from 'fs';

export const validateAccessToken = (token: any) => {
    if (process.env.JWT_VALIDATION_KEY_PATH == undefined) {
        throw new Error("env is wrong")
    }
    var cert = fs.readFileSync("../"+process.env.JWT_VALIDATION_KEY_PATH);
    var algo: Algorithm[] = []
    if (process.env.JWT_ALGORITHM != undefined)
        algo.push(<Algorithm>process.env.JWT_ALGORITHM)
    console.log(algo)
    const decodedJwt = <any>jwt.verify(token, cert, { algorithms: algo });
    return decodedJwt;

};