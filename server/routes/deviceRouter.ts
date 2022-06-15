import { createDeviceValidator } from './../validators/deviceValidator';
import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const deviceRouter = Router();

deviceRouter.post(
  '/',
  authMiddleware(['ADMIN']),
  createDeviceValidator,
  deviceController.create
);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/:id', deviceController.getOne);
