import { User } from "../models/user"
import express from 'express';
import { UserLogin } from "../models/user-login";

const userController = {
    async registerUser(req: express.Request, res: express.Response) {
        const body = req.body
        console.log(req)
        const user = new User(body.email, body.username)
        console.log(body.password)
        user.setPassword(body.password)
        let jwt = null
        try {
             jwt = await user.insertToDb()
        } catch (err: any) {
            return res.status(400).send(err.message)
        }
        if (jwt == null) {
            return res.status(400).send("Error")
        }
        return res.status(200).send(jwt?.accessToken)
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