import * as tokenService from './../services/tokenService';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error/ApiError';
import { TRole } from '../models/models';

export const authMiddleware =
  (roles: TRole[], searchById?: boolean) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.unauthorized());
      }

      const { authorization } = req.headers;

      if (!authorization) {
        return next(ApiError.unauthorized());
      }

      const accessToken = authorization.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.unauthorized());
      }

      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        return next(ApiError.unauthorized());
      }

      const isAllowedRole = userData.roles.some((role) => roles.includes(role));
      if (!isAllowedRole) {
        return next(
          ApiError.forbidden('You dont have an access for this information')
        );
      }

      if (searchById && String(userData.id) !== req.params?.id) {
        return next(ApiError.forbidden('This is not your account'));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
