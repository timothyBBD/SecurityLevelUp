import { Request, Response, NextFunction } from "express";
import { userDetails } from "../services/db-queries";

export const checkIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const username = res.locals.jwtPayload.username;
    const dbUser = await userDetails(username);
    if(Object.keys(dbUser).length === 0 && dbUser.constructor === Object)
    {
        res.status(401).send()
        return;
    }
    if (dbUser.admin) next();
    else res.status(401).send();
};