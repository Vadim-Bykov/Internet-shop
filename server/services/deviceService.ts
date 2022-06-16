import {
  Device,
  DeviceCreationAttributes,
  DeviceInfo,
  DeviceInfoCreationAttributes,
} from '../models/models';
import { ApiError } from '../error/ApiError';
import { saveFile } from './fileService';
import { UploadedFile } from 'express-fileupload';
import { GetAllDevicesReqQuery } from '../controllers/deviceController';

export const create = async ({
  name,
  price,
  typeId,
  brandId,
  img,
  info,
}: DeviceCreationAttributes) => {
  if (!img) {
    throw ApiError.badRequest('Image is required to upload');
  }

  const candidate = await Device.findOne({ where: { name } });
  if (candidate) {
    throw ApiError.badRequest(`Device ${name} already exists`);
  }

  const fileName = saveFile(img as UploadedFile);

  const device = await Device.create({
    name,
    price,
    brandId,
    typeId,
    img: fileName,
  });

  const deviceDto = { ...device.get() };

  if (info) {
    const parsedInfo: DeviceInfoCreationAttributes = JSON.parse(
      info as unknown as string
    );

    const deviceInfo = await DeviceInfo.create({
      title: parsedInfo.title,
      description: parsedInfo.description,
      deviceId: device.get().id,
    });

    deviceDto.info = deviceInfo.get();
  }

  return deviceDto;
};

export const getAll = async ({
  brandId,
  typeId,
  limit = 10,
  page = 1,
}: GetAllDevicesReqQuery) => {
  const offset = limit * page - limit;
  let devices;

  if (!brandId && !typeId) {
    devices = await Device.findAndCountAll({ limit, offset });
  }

  if (!brandId && typeId) {
    devices = await Device.findAndCountAll({
      where: { typeId },
      limit,
      offset,
    });
  }

  if (brandId && !typeId) {
    devices = await Device.findAndCountAll({
      where: { brandId },
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

  return { ...devices, page, limit };
};

export const getOne = async (id: number) => {
  const device = await Device.findOne({
    where: { id },
    include: [{ model: DeviceInfo, as: 'info' }],
  });

  return device;
};

export const updateDevice = async ({
  id,
  name,
  price,
  img,
  info,
}: DeviceCreationAttributes) => {
  const device = await Device.findOne({ where: { id } });

  if (!device) {
    throw ApiError.badRequest(`Device ${name} doesn't exist`);
  }

  const fileName = saveFile(img as UploadedFile);

  const updatedDevice = await Device.update(
    {
      name,
      price,
      img: fileName && fileName,
    },
    { where: { id }, returning: true }
  );

  const deviceDto = updatedDevice[1][0];

  if (info) {
    const parsedInfo: DeviceInfoCreationAttributes = JSON.parse(
      info as unknown as string
    );
    const deviceInfo = await DeviceInfo.update(
      { title: parsedInfo.title, description: parsedInfo.description },
      { where: { deviceId: id }, returning: true }
    );

    deviceDto.get().info = deviceInfo[1][0].get();
  }

  return deviceDto;
};

export const removeDevice = async (id: string) => {
  if (!id) {
    throw ApiError.badRequest('Set id to remove data');
  }

  const removedDeviceInfo = await DeviceInfo.destroy({
    where: { deviceId: id },
  });

  const removedDevice = await Device.destroy({ where: { id } });

  return { removedDevice, removedDeviceInfo };
};
