import { Type } from '../models/models.js';
import { ApiError } from '../Error/ApiError.js';

class Controller {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });

      return res.json(type);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      res.json(types);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export const typeController = new Controller();
