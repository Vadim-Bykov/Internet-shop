import { Router } from 'express';
import { deviceController } from '../controllers/deviceController.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

export const deviceRouter = Router();

deviceRouter.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);
