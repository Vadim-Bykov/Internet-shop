import { ApiError } from '../error/ApiError';
import { TController } from './controllerTypes';

export const registration: TController = async (req, res, next) => {
  try {
    const { id } = req.body;
    return res.json(id);
  } catch (error) {
    console.log(error);
  }
};

export const login: TController = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.json(id);
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
