import { Router } from 'express';
import { typeController } from '../controllers/typeController.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

export const typeRouter = Router();

typeRouter.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
typeRouter.get('/', typeController.getAll);
