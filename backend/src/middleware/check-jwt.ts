import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserJwt } from "../models/user-jwt-token";
import { createAccessToken, validateAccessToken } from "../services/authentication";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload;
    jwtPayload = validateAccessToken(token);
    if (jwtPayload == false) {
        res.status(401).send()
        return;
    }
    const payload: UserJwt = jwtPayload;
    res.locals.jwtPayload = jwtPayload;
    const newToken = createAccessToken(payload)
    res.setHeader("token", newToken);
    next();
}