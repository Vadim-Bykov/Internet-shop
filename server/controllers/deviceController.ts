import { TController } from './controllerTypes';
import * as deviceService from '../services/deviceService';
import { validationResult } from 'express-validator';
import { ApiError } from '../error/ApiError';
import { RequestHandler } from 'express';

export const create: RequestHandler = async (req, res, next) => {
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

type Params = {};
type ResBody = {};
type ReqBody = {};
export interface GetAllDevicesReqQuery {
  brandId: number;
  typeId: number;
  limit: number;
  page: number;
}

export const getAll: RequestHandler<
  Params,
  ResBody,
  ReqBody,
  GetAllDevicesReqQuery
> = async (req, res, next) => {
  try {
    const { brandId, typeId, limit, page } = req.query;

    const devices = await deviceService.getAll({
      brandId,
      typeId,
      limit,
      page,
    });

    res.json(devices);
  } catch (error) {
    next(error);
  }
};

interface GetOneParams {
  id: number;
}

export const getOne: RequestHandler<GetOneParams> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const device = await deviceService.getOne(id);
    res.json(device);
  } catch (error) {
    next(error);
  }
};
