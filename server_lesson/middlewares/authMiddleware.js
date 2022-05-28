import { ApiError } from '../Error/ApiError.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer hcuihpjcks[]

    if (!token) {
      return next(ApiError.unauthorized());
      // return res.status(401).json({ message: 'User is unauthorized' });
    }

    const decodedUserData = jwt.verify(token, process.env.SECRET_KEY);

    //  if (!decodedUserData) {
    //    return next(ApiError.forbidden('Token is incorrect'));
    //  }
    req.user = decodedUserData;
    next();
  } catch (error) {
    next(ApiError.unauthorized());
    //  res.status(401).json({ message: 'User is unauthorized_2' });
  }
};
