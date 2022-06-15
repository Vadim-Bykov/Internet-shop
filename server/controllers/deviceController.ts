import { TController } from './controllerTypes';
import * as deviceService from '../services/deviceService';
import { validationResult } from 'express-validator';
import { ApiError } from '../error/ApiError';

export const create: TController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validator error', errors.array()));
    }

    const device = await deviceService.create({
      ...req.body,
      img: req.files?.img,
    });

    res.json(device);
  } catch (error) {
    next(error);
  }
};

export const getAll: TController = async (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOne: TController = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json();
  } catch (error) {
    console.log(error);
  }
};
