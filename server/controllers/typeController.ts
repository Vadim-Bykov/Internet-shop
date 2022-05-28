import { ApiError } from '../error/ApiError';
import { Type } from '../models/models';
import { TController } from './controllerTypes';
import * as typeService from '../services/typeService';
import { validationResult } from 'express-validator';

export const create: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validator error', errors.array()));
    }
    const { name } = req.body;
    const type = await typeService.create(name);

    res.json(type);
  } catch (error) {
    next(error);
  }
};

export const getAll: TController = async (req, res, next) => {
  try {
    const types = await typeService.getAll();
    res.json(types);
  } catch (error) {
    next(error);
  }
};
