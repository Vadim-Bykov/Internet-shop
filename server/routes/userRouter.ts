import { Router } from 'express';
import * as userController from '../controllers/userController';
import {
  loginValidator,
  registrationValidator,
} from '../validators/userValidators';

export const userRouter = Router();

userRouter.post(
  '/registration',
  registrationValidator,
  userController.registration
);
userRouter.post('/login', loginValidator, userController.login);
userRouter.post('/logout', userController.logout);
userRouter.get('/auth', userController.checkAuth);
