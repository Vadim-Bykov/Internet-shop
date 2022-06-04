import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
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
userRouter.get('/refresh', userController.refresh);
userRouter.get('/', authMiddleware(['ADMIN']), userController.getAllUsers);
userRouter.get(
  '/:id',
  authMiddleware(['USER', 'ADMIN'], true),
  userController.getUserById
);
