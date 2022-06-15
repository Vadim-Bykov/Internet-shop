import {
  Device,
  DeviceCreationAttributes,
  DeviceInfo,
  DeviceInfoCreationAttributes,
} from '../models/models';
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
