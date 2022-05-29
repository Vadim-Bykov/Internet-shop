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
    return await Token.update({ refreshToken, userId }, { where: { userId } });
  }

  await Token.create({
    refreshToken,
    userId,
  });
};
