import { ApiError } from '../Error/ApiError.js';
import { Brand } from '../models/models.js';

class Controller {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });

      res.json(brand);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, nex) {
    try {
      const brands = await Brand.findAll();
      res.json(brands);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export const brandController = new Controller();
