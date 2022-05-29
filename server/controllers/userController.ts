import { ApiError } from '../error/ApiError';
import { TController } from './controllerTypes';
import * as userService from '../services/userService';

export const registration: TController = async (req, res, next) => {
  try {
    const user = await userService.registration({
      ...req.body,
      picture: req.files?.picture,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const login: TController = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.json(id);
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
