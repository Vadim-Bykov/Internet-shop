import { Router } from 'express';
import { brandRouter } from './brandRouter';
import { deviceRouter } from './deviceRouter';
import { typeRouter } from './typeRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
