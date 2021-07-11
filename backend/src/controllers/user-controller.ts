import { User } from "../models/user"
import express from 'express';
import { UserLogin } from "../models/user-login";

const userController = {
    async registerUser(req: express.Request, res: express.Response) {
        const body = req.body
        const user = new User(body.name, body.surname, body.email, body.username)
        user.setPassword(body.password)
        await user.insertToDb()
        res.status(200).send()
    },

    async loginUser(req: express.Request, res: express.Response) {
        const userLogin = new UserLogin(req.body.username, req.body.password)
        if (await userLogin.login())
            return res.status(200).send(userLogin.getAccessToken())
        else
            res.status(400).send("Failed to login, Invalid User details provided")
    },

    forgotPassword(req: express.Request, res: express.Response) {
        res.status(200)
    }
}

export default userController