import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserJwt } from "../models/user-jwt-token";
import { createAccessToken, validateAccessToken } from "../services/authentication";
import { userDetails } from "../services/db-queries";

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload;
    try {
        jwtPayload = validateAccessToken(token);
    } catch {
        res.status(401).send("JWY token isn't valid")
    }
    console.log(jwtPayload)
    if (jwtPayload == false) {
        res.status(401).send()
        return;
    }
    const payload: UserJwt = jwtPayload;
    res.locals.jwtPayload = jwtPayload;
    const db_user = await userDetails(payload.sub)
    res.locals.user = db_user;
    const newToken = createAccessToken(payload)
    res.setHeader("token", newToken);
    next();
}