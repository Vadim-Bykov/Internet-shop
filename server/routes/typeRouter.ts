import { Router } from 'express';
import { body } from 'express-validator';
import * as typeController from '../controllers/typeController';

export const typeRouter = Router();

typeRouter.post(
  '/',
  [body('name', 'Name is required, validator').trim().isLength({ min: 1 })],
  typeController.create
);
typeRouter.get('/', typeController.getAll);
