import { Router } from 'express';
import { body } from 'express-validator';
import * as brandController from '../controllers/brandController';

export const brandRouter = Router();

brandRouter.post(
  '/',
  [body('name', 'Name is required, validator').trim().isLength({ min: 1 })],
  brandController.create
);
brandRouter.get('/', brandController.getAll);
