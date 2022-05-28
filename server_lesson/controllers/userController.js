import { ApiError } from '../Error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Basket, User } from '../models/models.js';

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class Controller {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Incorrect email or password'));
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('User with this email already exists'));
      }

      const hashPassword = await bcrypt.hash(password, 3);

      const user = await User.create({ email, password: hashPassword, role });
      const basket = await Basket.create({ id: user.id });
      const token = generateJwt(user.id, email, user.role);

      res.json({ user, basket, token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(
          ApiError.badRequest(`User with email ${email} is not exist`)
        );
      }

      const isValidPass = bcrypt.compareSync(password, user.password);
      if (!isValidPass) {
        return next(ApiError.badRequest('Password is incorrect'));
      }

      const token = generateJwt(user.id, user.email, user.role);

      res.json({ user, token });
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async checkAuth(req, res, next) {
    const { id, email, role } = req.user;
    try {
      const token = generateJwt(id, email, role);
      res.json({ token });
    } catch (error) {
      // next(ApiError.internal(error.message));
    }
  }
}

export const userController = new Controller();
