
import express from 'express';
import userController from '../controllers/user-controller';
import { UserJwt } from '../models/user-jwt-token';

const userRouter = express.Router();

userRouter.route('/').post(userController.registerUser)
userRouter.route('/login').post(userController.loginUser)
userRouter.route('/forgot-password').post(userController.forgotPassword)

export default userRouter;
