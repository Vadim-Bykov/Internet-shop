import { Router } from 'express';
import { brandController } from '../controllers/brandController.js';
import { checkRoleMiddleware } from '../middlewares/checkRoleMiddleware.js';

export const brandRouter = Router();

brandRouter.post('/', checkRoleMiddleware('ADMIN'), brandController.create);
brandRouter.get('/', brandController.getAll);
