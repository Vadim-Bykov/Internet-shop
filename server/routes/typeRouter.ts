import { Router } from 'express';
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
typeRouter.put(
  '/:id',
  createTypeValidator,
  authMiddleware(['ADMIN']),
  typeController.updateType
);
typeRouter.delete('/:id', authMiddleware(['ADMIN']), typeController.removeType);
