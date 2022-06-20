import { ApiError } from '../error/ApiError';
import {
  DeviceInfo,
  DeviceInfoAttributes,
  DeviceInfoCreationAttributes,
} from './../models/models';

export const getDeviceInfoByDeviceId = async (deviceId: number) => {
  if (!deviceId) {
    throw ApiError.badRequest("You haven't provided device id");
  }

  const deviceInfo = await DeviceInfo.findOne({ where: { deviceId } });
  return deviceInfo?.get();
};

export const createDeviceInfo = async ({
  title,
  description,
  deviceId,
}: DeviceInfoCreationAttributes) => {
  const deviceInfo = await DeviceInfo.create({ title, description, deviceId });

  return deviceInfo.get();
};

export const updateDeviceInfo = async ({
  title,
  description,
  deviceId,
}: DeviceInfoAttributes) => {
  const candidate = await getDeviceInfoByDeviceId(deviceId);

  if (candidate) {
    const deviceInfo = await DeviceInfo.update(
      { title, description },
      { where: { deviceId }, returning: true }
    );

    return deviceInfo[1][0].get();
  } else {
    const deviceInfo = await createDeviceInfo({
      title,
      description,
      deviceId,
    });

    return deviceInfo;
  }
};
