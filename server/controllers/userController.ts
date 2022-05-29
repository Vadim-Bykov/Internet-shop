import { NextFunction, Request } from 'express';
import { ApiError } from '../error/ApiError';
import { TController } from './controllerTypes';
import * as userService from '../services/userService';
import { validationResult } from 'express-validator';

const validateInputData = (req: Request, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(ApiError.badRequest('Validator errors', errors.array()));
  }
};

export const registration: TController = async (req, res, next) => {
  try {
    validateInputData(req, next);

    const user = await userService.registration({
      ...req.body,
      picture: req.files?.picture,
    });

    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login: TController = async (req, res, next) => {
  try {
    validateInputData(req, next);

    const tokens = await userService.login(req.body);

    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const logout: TController = async (req, res, next) => {
  try {
    // return res.json(id);
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth: TController = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('No id was given'));
    }
    return res.json(id);
  } catch (error) {
    console.log(error);
  }
};
