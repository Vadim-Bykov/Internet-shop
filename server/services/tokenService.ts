import jwt from 'jsonwebtoken';
import { IntegerDataType } from 'sequelize/types';
import { IUserDto } from '../dtos/userDto';
import { Token } from '../models/models';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (payload: IUserDto) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '30m',
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (
  userId: IntegerDataType,
  refreshToken: string
) => {
  const tokenData = await Token.findOne({ where: { userId } });

  if (tokenData) {
    return await Token.update({ refreshToken }, { where: { userId } });
  }

  await Token.create({ refreshToken, userId });
};

export const removeRefreshToken = async (refreshToken: string) => {
  const isDestroyed = await Token.destroy({ where: { refreshToken } });
  return !!isDestroyed;
};

export const findRefreshToken = async (refreshToken: string) => {
  const tokenData = await Token.findOne({ where: { refreshToken } });
  return tokenData;
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET as string);

    return userData as IUserDto;
  } catch (error) {
    return null;
  }
};

export const validateAccessToken = (accessToken: string) => {
  try {
    const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET as string);
    console.log({ userData });

    return userData as IUserDto;
  } catch (error) {
    return null;
  }
};
