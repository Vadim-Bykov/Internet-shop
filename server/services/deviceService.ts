import { v4 } from 'uuid';
import path from 'path';
import { Device, DeviceCreationAttributes, DeviceInfo } from '../models/models';
import { ApiError } from '../error/ApiError';
import { saveFile } from './fileService';
import { UploadedFile } from 'express-fileupload';

export const create = async ({
  name,
  price,
  typeId,
  brandId,
  img,
  info,
}: DeviceCreationAttributes) => {
  const candidate = await Device.findOne({ where: { name } });
  if (candidate) {
    throw ApiError.badRequest(`Device ${candidate} already exists`);
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
    const deviceInfo = await DeviceInfo.create({
      title: info.title,
      description: info.description,
      deviceId: device.get().id,
    });

    deviceDto.info = deviceInfo.get();
  }

  return deviceDto;
};
