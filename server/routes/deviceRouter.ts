import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

export const deviceRouter = Router();

deviceRouter.post('/', deviceController.create);
deviceRouter.get('/', deviceController.getAll);
deviceRouter.get('/: id', deviceController.getOne);
