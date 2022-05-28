import { ApiError } from '../Error/ApiError.js';
import jwt from 'jsonwebtoken';

export const checkRoleMiddleware = (role) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer hcuihpjcks[]

    if (!token) {
      return next(ApiError.unauthorized());
    }

    const decodedUserData = jwt.verify(token, process.env.SECRET_KEY);
    console.log({ decodedUserData, role });
    if (decodedUserData.role !== role) {
      return next(ApiError.forbidden('You have no access'));
    }
    req.user = decodedUserData;
    next();
  } catch (error) {
    next(ApiError.unauthorized());
    //  res.status(401).json({ message: 'User is unauthorized_2' });
  }
};
