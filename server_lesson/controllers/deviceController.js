import { v4 } from 'uuid';
import path from 'path';
import { Device, DeviceInfo } from '../models/models.js';
import { ApiError } from '../Error/ApiError.js';
// import { __dirname } from '../index.js';

class Controller {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = v4() + '.jpg';
      // const filePath = path.resolve(__dirname, 'static', fileName);
      const filePath = path.resolve('static', fileName);
      img.mv(filePath);

      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((item) =>
          DeviceInfo.create({
            title: item.title,
            description: item.description,
            deviceId: device.id,
          })
        );
      }

      res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { brandId, typeId, limit = 10, page = 1 } = req.query;
      // page = page || 1;
      // limit = limit || 10;
      const offset = limit * page - limit;
      let devices;

      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId, typeId },
          limit,
          offset,
        });
      }

      res.json({ ...devices, page, limit });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: 'info' }],
      });

      res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export const deviceController = new Controller();
