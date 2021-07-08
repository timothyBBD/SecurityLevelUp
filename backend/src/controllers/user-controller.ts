import { User } from "../models/user"
import express from 'express';

const userController = {
    async registerUser(req: express.Request, res: express.Response) {
        const body = req.body
        const user = new User(body.name, body.surname, body.email, body.username)
        user.setPassword(body.password)
        await user.insertToDb()
        res.status(200).send()
    },

    loginUser(req: express.Request, res: express.Response) {
        const jwtToken = ""
        res.status(200).send(jwtToken)
    },

    forgotPassword(req: express.Request, res: express.Response) {
        res.status(200)
    }
}

export default userController