import { Router } from 'express';
import * as userController from '../controllers/userController';

export const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/auth', userController.checkAuth);
