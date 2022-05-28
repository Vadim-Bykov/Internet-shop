import { TController } from './controllerTypes';
import * as brandService from '../services/brandService';
import { ApiError } from '../error/ApiError';
import { validationResult } from 'express-validator';

export const create: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validation error', errors.array()));
    }
    const { name } = req.body;
    const brands = await brandService.create(name);

    res.json(brands);
  } catch (error) {
    next(error);
  }
};

export const getAll: TController = async (req, res, next) => {
  try {
    const brands = await brandService.getAll();
    res.json(brands);
  } catch (error) {
    console.log(error);
  }
};
