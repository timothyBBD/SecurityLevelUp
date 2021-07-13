
import express from 'express';
import userController from '../controllers/user-controller';
import { UserJwt } from '../models/user-jwt-token';
import { body, validationResult } from 'express-validator';

const userRouter = express.Router();

userRouter.route('/').post(body("email").isEmail(), body("password").isLength({ min: 8 }), body("username").not().isEmpty().trim().escape(), userController.registerUser)
userRouter.route('/login').post(body("email").isEmail(), body("password").isLength({ min: 8 }), userController.loginUser)
userRouter.route('/forgot-password').post(userController.forgotPassword)

export default userRouter;
