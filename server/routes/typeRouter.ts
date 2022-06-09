import { Router } from 'express';
import { body } from 'express-validator';
import * as typeController from '../controllers/typeController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createTypeValidator } from '../validators/typeValidators';

export const typeRouter = Router();

typeRouter.post(
  '/',
  createTypeValidator,
  authMiddleware(['ADMIN']),
  typeController.create
);
typeRouter.get('/', typeController.getAll);
typeRouter.get('/details', typeController.getTypeById);
typeRouter.put('/:id', createTypeValidator, typeController.updateType);
